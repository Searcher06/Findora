import { requestModel } from "../models/request.model.js";
import { messageModel } from "../models/message.model.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import cloudinary from "../config/cloudinary.js";
const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  const users = await requestModel
    .find({
      $or: [{ finderId: userId }, { claimerId: userId }],
    })
    .populate("finderId", "-password")
    .populate("claimerId", "-password");
  res.status(200).json(users);
};
const sendMessage = async (req, res) => {
  const { id: userToChatId, username: userToChatUsername } = req.userToChat;
  const { id: userId } = req.user;
  const { requestId } = req.params;
  let { value: text } = req.body.message;
  text = text.trim();

  if (!text) {
    res.status(400);
    throw new Error("Message can't be blank");
  }

  let imageUrl = null;
  const file = req.file;
  if (file) {
    if (!file.mimetype.startsWith("image/")) {
      res.status(400);
      throw new Error("Uploaded file is not an image");
    }

    if (file.size > 5 * 1024 * 1024) {
      res.status(400);
      throw new Error("File size must be less than 5MB");
    }

    if (!file.buffer) {
      res.status(400);
      throw new Error("File data is corrupted");
    }

    const base64 = file.buffer.toString("base64");
    const dataUri = `data:${file.mimetype};base64,${base64}`;
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "lost_found_items",
    });

    imageUrl = uploadResult.secure_url;
  }

  const newMessage = await messageModel.create({
    senderId: userId,
    receiverId: userToChatId,
    text,
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

  res.status(201).json(populatedMessage);
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
