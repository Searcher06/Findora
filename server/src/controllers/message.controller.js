import { userModel } from "../models/user.model.js";
import { requestModel } from "../models/request.model.js";
const getUsersToChat = async (req, res) => {
  const { id: userId } = req.user;
  let usersArray = [];
  const users = await requestModel
    .find({
      status: "accepted",
      $or: [{ finderId: userId }, { claimerId: userId }],
    })
    .populate("claimerId", "-password")
    .populate("finderId", "-password");

  users.forEach((element) => {
    return (
      usersArray.push(element.finderId) && usersArray.push(element.claimerId)
    );
  });

  usersArray = usersArray.filter((user) => user._id != userId.toString());
  res.status(200).json(usersArray);
};

export { getUsersToChat };
