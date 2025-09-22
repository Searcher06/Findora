import mongoose from "mongoose";
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

  request.questions.push(...questions);
  await request.save();

  const updatedRequest = await requestModel.findById(requestId);
  res.status(200).json(updatedRequest);
};
const setRequestAnswers = async (req, res) => {
  // Destructuring the request id from requesObject and changing the name to requestId
  const { id: requestId } = req.requestObject;

  // Getting the full request info from
  const request = await requestModel.findById(requestId);

  // Destructuring the answers array
  const { answers } = req.body;

  // Getting the questions array from the request document
  const questions = request.questions;

  // checking if both the questions and answers array have the same length
  // to make sure all questions are answered
  if (questions.length != answers.length) {
    res.status(400);
    throw new Error("All questions needs to be answered.");
  }

  for (const a of answers) {
    if (!a.answer || a.answer.trim().length < 1) {
      res.status(400);
      throw new Error(
        "Answer should not be blank\nAll questions needs to be answered"
      );
    }
  }

  // looping through each answer to find the question that matches the questionId
  answers.forEach(({ questionId, answer }) => {
    const q = request.questions.id(questionId);

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      res.status(400);
      throw new Error("Invalid question ID");
    }

    if (!q) {
      res.status(404);
      throw new Error("Question not found!");
    }
    q.answer = answer;
  });

  await request.save();
  const updatedRequest = await requestModel.findById(requestId);
  res.status(200).json(updatedRequest);
};
const setRequestDecision = async (req, res) => {
  const { id: requestId } = req.requestObject;

  const { value: decision } = req.body.decision;

  const request = await requestModel.findById(requestId);

  if (!decision) {
    res.status(400);
    throw new Error("Decision can't be blank!");
  }

  if (decision != "accept" || decision != "reject") {
    res.status(400);
    throw new Error("Decision can either be accept or reject");
  }

  request.status = decision;
  await request.save();
  const updatedRequest = await requestModel.findById(requestId);
  res.status(200).json(updatedRequest);
};

export {
  claimItem,
  getAllRequests,
  setRequestQuestions,
  setRequestAnswers,
  setRequestDecision,
};

/*

  [
    {questionId:123456,answer:"The bag is red in color"},
    {questionId:245435,answer:"There is a black logo written on the bag"},
    {questionId:245435,answer:""},
  ]


  [
  {_id:123456,question:"What is the color of the bag"},
  {_id:245435,question:"What is the color of the bags logo"},
  ]

*/
