import { requestModel } from "../models/request.model.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import cloudinary from "../config/cloudinary.js";

const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  // Using $in to correctly handle multiple statuses
  const users = await requestModel
    .find({
      participants: userId,
      status: { $in: ["pending", "accepted"] },
    })
    .populate("finderId", "-password")
    .populate("claimerId", "-password");
  res.status(200).json(users);
};

const sendMessage = async (req, res) => {
  try {
    const { id: userToChatId, username: userToChatUsername } = req.userToChat;
    const { id: userId } = req.user;
    const { requestId } = req.params;

    let { text } = req.body;
    text = text ? text.trim() : "";
    const file = req.file;

    if (!text && !file) {
      return res.status(400).json({
        message: "Message must contain text or an image",
      });
    }

    if (userToChatId == userId) {
      return res.status(400).json({
        message: "Can't send message to yourself",
      });
    }

    let imageUrl = null;
    if (file) {
      if (!file.mimetype.startsWith("image/")) {
        return res
          .status(400)
          .json({ message: "Uploaded file is not an image" });
      }
      if (file.size > 5 * 1024 * 1024) {
        return res
          .status(400)
          .json({ message: "File size must be less than 5MB" });
      }

      try {
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;
        const uploadResult = await cloudinary.uploader.upload(dataUri, {
          folder: "lost_found_items",
        });
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        return res
          .status(500)
          .json({ message: `Image upload failed: ${uploadError.message}` });
      }
    }

    // UPDATE: Push to the conversation array in requestModel
    const updatedRequest = await requestModel
      .findByIdAndUpdate(
        requestId,
        {
          $push: {
            conversation: {
              senderId: userId,
              receiverId: userToChatId,
              text: text,
              image: imageUrl,
            },
          },
          $set: {
            lastMessage: { text: text || "Sent an image", senderId: userId },
            lastMessageAt: new Date(),
          },
        },
        { new: true }
      )
      .populate("conversation.senderId", "-password")
      .populate("conversation.receiverId", "-password");

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Get the last message from the array
    const populatedMessage =
      updatedRequest.conversation[updatedRequest.conversation.length - 1];

    const receiverSocketId = getRecieverSocketId(userToChatUsername);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    return res.status(201).json(populatedMessage);
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Fetch directly from the Request document
    const request = await requestModel
      .findById(requestId)
      .populate("conversation.senderId", "-password")
      .populate("conversation.receiverId", "-password");

    if (!request) {
      return res.status(404).json({ message: "Chat not found" });
    }

    res.status(200).json(request.conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getUsersToChat, sendMessage, getAllMessages };
