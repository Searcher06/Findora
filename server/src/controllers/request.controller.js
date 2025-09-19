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
const setRequestQuestions = async (req, res) => {
  // Destructuring the request id from requesObject and changing the name to requestId
  const { id: requestId } = req.requestObject;
  // Getting the full request info from
  const request = await requestModel.findById(requestId);
  // Destructuring the questions array
  const { questions } = req.body;
  // checking the length of question array
  if (questions.length < 2) {
    res.status(400);
    throw new Error("You have to ask atleast two question");
  }
  // looping through each question object for validation
  for (const q of questions) {
    if (
      !q.question ||
      typeof q.question !== "string" ||
      q.question.trim().length < 5
    ) {
      res.status(400);
      throw new Error("Each question must be atleast 5 characters.");
    }
  }

  request.questions = [...questions];
  await request.save();

  const updatedRequest = await requestModel.findById(requestId);
  res.status(200).json(updatedRequest);
};

export { claimItem, getAllRequests, setRequestQuestions };
