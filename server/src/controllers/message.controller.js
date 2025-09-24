import { userModel } from "../models/user.model.js";
import { requestModel } from "../models/request.model.js";
const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  const users = await requestModel
    .find({
      status: "accepted",
      $or: [{ finderId: userId }, { claimerId: userId }],
    })
    .populate("claimerId", "-password")
    .populate("finderId", "-password");

  users.filter((element) => {
    return element.finderId._id !== userId || element.claimerId._id !== userId;
  });
  res.status(200).json(users);
};

export { getUsersToChat };
