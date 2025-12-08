import { userModel } from "../models/user.model.js";
import { requestModel } from "../models/request.model.js";

export const chatMiddleware = async (req, res, next) => {
  // destructuring the username from the req parameter
  const { username: userToChatUsername } = req.params;
  const { id: userId } = req.user;

  const userToChat = await userModel.findOne({ username: userToChatUsername });

  // if there no user found throw an error
  if (!userToChat) {
    res.status(404);
    throw new Error("User not found!");
  }

  // checking the dB for any request in which the request status is accepted
  // and either the finder is the current user and the claimer is the user to chat
  // or the finder is the user to chat and the claimer is the current user
  const request = await requestModel.findOne({
    status: "accepted",
    $or: [
      { finderId: userId, claimerId: userToChat.id },
      { finderId: userToChat.id, claimerId: userId },
    ],
  });

  // If the above request doesn't exist throw an error
  if (!request) {
    res.status(403);
    throw new Error(
      "You can't chat with this user, you don't have any lost or found item case"
    );
  }

  req.userToChat = userToChat;

  next();
};
