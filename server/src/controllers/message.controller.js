import { requestModel } from "../models/request.model.js";
import { messageModel } from "../models/message.model.js";
const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  const users = await requestModel
    .find({
      status: "accepted",
      $or: [{ finderId: userId }, { claimerId: userId }],
    })
    .populate("claimerId", "-password")
    .populate("finderId", "-password");
  res.status(200).json(users);
};
const sendMessage = async (req, res) => {
  const { id: userToChatId } = req.userToChat;
  const { id: userId } = req.user;
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
  });

  res.status(201).json(newMessage);
};
const getAllMessages = async (req, res) => {
  const { id: userToChatId } = req.userToChat;
  const { id: userId } = req.user;

  const messages = await messageModel.find({
    $or: [
      { senderId: userId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: userId },
    ],
  });

  res.status(200).json(messages);
};
export { getUsersToChat, sendMessage, getAllMessages };
