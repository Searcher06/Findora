import { requestModel } from "../models/request.model.js";
import { messageModel } from "../models/message.model.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import cloudinary from "../config/cloudinary.js";
const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  const users = await requestModel
    .find({
      $or: [{ finderId: userId }, { claimerId: userId }],
      status: "pending" || "accepted",
    })
    .populate("finderId", "-password")
    .populate("claimerId", "-password");
  res.status(200).json(users);
};
// const sendMessage = async (req, res) => {
//   const { id: userToChatId, username: userToChatUsername } = req.userToChat;
//   const { id: userId } = req.user;
//   const { requestId } = req.params;
//   let { text } = req.body;
//   text = text.trim();

//   if (!text) {
//     res.status(400);
//     throw new Error("Message can't be blank");
//   }

//   if (userToChatId == userId) {
//     res.status(400);
//     throw new Error("Can't send message to yourself");
//   }

//   let imageUrl = null;
//   const file = req.file;
//   if (file) {
//     if (!file.mimetype.startsWith("image/")) {
//       res.status(400);
//       throw new Error("Uploaded file is not an image");
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       res.status(400);
//       throw new Error("File size must be less than 5MB");
//     }

//     if (!file.buffer) {
//       res.status(400);
//       throw new Error("File data is corrupted");
//     }

//     const base64 = file.buffer.toString("base64");
//     const dataUri = `data:${file.mimetype};base64,${base64}`;
//     const uploadResult = await cloudinary.uploader.upload(dataUri, {
//       folder: "lost_found_items",
//     });

//     imageUrl = uploadResult.secure_url;
//   }

//   const newMessage = await messageModel.create({
//     senderId: userId,
//     receiverId: userToChatId,
//     text,
//     requestId,
//     image: imageUrl,
//   });
//   await newMessage.save();

//   const populatedMessage = await messageModel
//     .findById(newMessage.id)
//     .populate("senderId", "-password")
//     .populate("receiverId", "-password");

//   const receiverSocketId = getRecieverSocketId(userToChatUsername);
//   if (receiverSocketId) {
//     io.to(receiverSocketId).emit("newMessage", populatedMessage);
//   }

//   res.status(201).json(populatedMessage);
// };
const sendMessage = async (req, res) => {
  try {
    const { id: userToChatId, username: userToChatUsername } = req.userToChat;
    const { id: userId } = req.user;
    const { requestId } = req.params;

    // Get text from FormData (could be empty string or undefined)
    let { text } = req.body;
    text = text ? text.trim() : "";

    const file = req.file;

    // Validate: Must have either text OR image
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
      // Validate image
      if (!file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          message: "Uploaded file is not an image",
        });
      }

      if (file.size > 5 * 1024 * 1024) {
        return res.status(400).json({
          message: "File size must be less than 5MB",
        });
      }

      if (!file.buffer) {
        return res.status(400).json({
          message: "File data is corrupted",
        });
      }

      try {
        const base64 = file.buffer.toString("base64");
        const dataUri = `data:${file.mimetype};base64,${base64}`;

        // Add timeout to prevent hanging
        const uploadResult = await Promise.race([
          cloudinary.uploader.upload(dataUri, {
            folder: "lost_found_items",
            timeout: 30000, // 30 second timeout
          }),
          new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Cloudinary upload timeout")),
              35000
            )
          ),
        ]);

        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error("Debug - Cloudinary upload failed:", uploadError);
        return res.status(500).json({
          message: `Image upload failed: ${uploadError.message}`,
        });
      }
    }

    const newMessage = await messageModel.create({
      senderId: userId,
      receiverId: userToChatId,
      text: text, // Can be empty string
      requestId,
      image: imageUrl,
    });

    await newMessage.save();

    const populatedMessage = await messageModel
      .findById(newMessage.id)
      .populate("senderId", "-password")
      .populate("receiverId", "-password");

    const receiverSocketId = getRecieverSocketId(userToChatUsername);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    return res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Debug - Error in sendMessage:", error);

    // Handle specific errors
    if (error.name === "MongoError") {
      return res.status(500).json({
        message: "Database error occurred",
      });
    }

    return res.status(error.status || 500).json({
      message: error.message || "Internal server error",
    });
  }
};
const getAllMessages = async (req, res) => {
  const { id: userToChatId } = req.userToChat;
  const { id: userId } = req.user;
  const { requestId } = req.params;
  const messages = await messageModel
    .find({
      $or: [
        { senderId: userId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: userId },
      ],
      requestId,
    })
    .populate("senderId", "-password")
    .populate("receiverId", "-password");

  res.status(200).json(messages);
};
export { getUsersToChat, sendMessage, getAllMessages };
