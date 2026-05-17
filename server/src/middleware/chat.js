import { userModel } from "../models/user.model.js";
import { requestModel } from "../models/request.model.js";
import mongoose from "mongoose";
export const chatMiddleware = async (req, res, next) => {
  // destructuring the username from the req parameter
  const { username: userToChatUsername, requestId } = req.params;
  const currentUserId = req.user?.id?.toString();

  // getting the user to send message to, using their username
  const userToChat = await userModel.findOne({ username: userToChatUsername });

  // checking if theres no user with such username, throw an error
  if (!userToChat) {
    res.status(404);
    throw new Error("User not found!");
  }

  // checking if the requestId is valid
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID, check your url");
  }

  const requestExists = await requestModel.findById(requestId);
  // checking if there's no request
  if (!requestExists) {
    res.status(404);
    throw new Error("Request not found!, check your url, for incorrect id");
  }

  if (!currentUserId) {
    res.status(401);
    throw new Error("Not authorized, no user");
  }

  const finderId = requestExists.finderId.toString();
  const claimerId = requestExists.claimerId.toString();

  const isParticipant =
    currentUserId === finderId || currentUserId === claimerId;
  if (!isParticipant) {
    res.status(403);
    throw new Error("Forbidden, you are not a participant in this request");
  }

  if (userToChat.id.toString() === currentUserId) {
    res.status(400);
    throw new Error("Invalid chat target");
  }

  const expectedOtherParticipantId =
    currentUserId === finderId ? claimerId : finderId;
  if (userToChat.id.toString() !== expectedOtherParticipantId) {
    res.status(403);
    throw new Error("Forbidden, target user is not part of this request");
  }

  req.userToChat = userToChat;

  next();
};
