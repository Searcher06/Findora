import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import { requestModel } from "../models/request.model.js";
export const chatMiddleware = async (req, res, next) => {
  const { username: userToChatUsername } = req.params;
  const { id: userId } = req.user;

  const user = await userModel.findById(userId);
  const userToChat = await userModel.findOne({ username: userToChatUsername });

  if (!userToChat) {
    res.status(404);
    throw new Error("User not found!");
  }

  const request = await requestModel.findOne({
    status: "accepted",
    $or: [
      { finderId: userId, claimerId: userToChat.id },
      { finderId: userToChat.id, claimerId: userId },
    ],
  });
};
