import { requestModel } from "../models/request.model.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import cloudinary from "../config/cloudinary.js";

// Function to clear the red dot (mark as read)
const markAsRead = async (req, res) => {
  const { requestId } = req.params;
  const { id: userId } = req.user;

  const request = await requestModel.findById(requestId);
  if (!request) {
    res.status(404);
    throw new Error("Chat not found");
  }

  // Determine if the user is the finder or claimer to update the correct field
  const isFinder = request.finderId.toString() === userId;
  const isClaimer = request.claimerId.toString() === userId;

  if (!isFinder && !isClaimer) {
    res.status(304);
    throw new Error("Not Authorized");
  }

  // prettier-ignore
  const updateField = isFinder ? "lastSeen.finder" : isClaimer && "lastSeen.claimer"

  await requestModel.findByIdAndUpdate(requestId, {
    $set: { [updateField]: new Date() },
  });

  res.status(200).json({ message: "Marked as read" });
};

const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  const users = await requestModel
    .find({
      participants: userId,
      status: { $in: ["pending", "accepted"] },
    })
    .populate("finderId", "-password")
    .populate("claimerId", "-password")
    .sort({ lastMessageAt: -1 });

  res.status(200).json(users);
};

const sendMessage = async (req, res) => {
  const { id: userToChatId, username: userToChatUsername } = req.userToChat;
  const { id: userId } = req.user;
  const { requestId } = req.params;

  let { text } = req.body;
  text = text ? text.trim() : "";
  const file = req.file;

  if (!text && !file) {
    res.status(400);
    throw new Error("Message must contain text or an image");
  }

  let imageUrl = null;
  if (file) {
    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "lost_found_items",
    });
    imageUrl = uploadResult.secure_url;
  }

  const requestDoc = await requestModel.findById(requestId);
  if (!requestDoc) {
    res.status(404);
    throw new Error("Request not found");
  }

  const isFinder = requestDoc.finderId.toString() === userId;
  const senderSeenField = isFinder ? "lastSeen.finder" : "lastSeen.claimer";

  const updatedRequest = await requestModel
    .findByIdAndUpdate(
      requestId,
      {
        $push: {
          conversation: {
            senderId: userId,
            receiverId: userToChatId,
            text,
            image: imageUrl,
          },
        },
        $set: {
          lastMessage: { text: text || "Sent an image", senderId: userId },
          lastMessageAt: new Date(),
          [senderSeenField]: new Date(),
        },
      },
      { new: true }
    )
    .populate("conversation.senderId", "-password");

  // 1. Get the last message from the updated conversation array
  const populatedMessage =
    updatedRequest.conversation[updatedRequest.conversation.length - 1];

  // 2. Attach the requestId so the frontend Zustand store knows which conversation to update
  const messageWithRequestId = {
    ...populatedMessage.toObject(),
    requestId: requestId,
  };

  const receiverSocketId = getRecieverSocketId(userToChatUsername);
  if (receiverSocketId) {
    // 3. Emit the enriched object
    io.to(receiverSocketId).emit("newMessage", messageWithRequestId);
    io.to(receiverSocketId).emit("newMessageNotification", { requestId });
  }

  res.status(201).json(messageWithRequestId);
};
const getAllMessages = async (req, res) => {
  const { requestId } = req.params;
  const request = await requestModel
    .findById(requestId)
    .populate("conversation.senderId", "-password")
    .populate("conversation.receiverId", "-password");

  if (!request) {
    res.status(404);
    throw new Error("Chat not found");
  }

  res.status(200).json(request.conversation);
};

export { getUsersToChat, sendMessage, getAllMessages, markAsRead };
