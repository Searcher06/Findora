import { requestModel } from "../models/request.model.js";
import { messageModel } from "../models/message.model.js";
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
  const { id: userToChatId } = req.userToChat;
  const { id: userId } = req.user;
  const { requestId } = req.params;
  let { value: text } = req.body.message;
  text = text.trim();

  if (!text) {
    res.status(400);
    throw new Error("Message can't be blank");
  }

  const newMessage = await messageModel.create({
    senderId: userId,
    receiverId: userToChatId,
    text,
    requestId,
  });
  await newMessage.save();
  const populatedMessage = await messageModel
    .findById(newMessage.id)
    .populate("senderId", "-password")
    .populate("receiverId", "-password");

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
