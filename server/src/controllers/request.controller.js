import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";

const claimItem = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const finderId = item.reportedBy;

  const requestExists = await requestModel.findOne({
    itemId,
    finderId,
    claimerId: userID,
  });

  // checking if the there is claim request for the same item by the same finder and claimer
  if (requestExists) {
    res.status(400);
    throw new Error("You already sent a claim request for this item!");
  }

  const request = await requestModel.create({
    itemId,
    finderId,
    claimerId: userID,
  });

  res.status(201).json(request);
};
const getAllRequests = async (req, res) => {
  const { id: userId } = req.user;
  const requests = await requestModel.find({
    $or: [{ finderId: userId }, { claimerId: userId }],
  });

  res.status(200).json(requests);
};
const setRequestQuestions = async (req, res) => {};

export { claimItem, getAllRequests, setRequestQuestions };
