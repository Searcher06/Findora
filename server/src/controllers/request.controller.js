import mongoose from "mongoose";
import { itemModel } from "../models/item.model.js";
import { requestModel } from "../models/request.model.js";
import { validateId } from "../utils/validateID.js";

const claimItem = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item; // id
  const item = await itemModel.findById(itemId);
  const finderId = item.reportedBy;

  // checking if there is a found request in which the item id is the current item id
  // the claimerid is the current user and the requestType is "found"
  const foundRequest = await requestModel.findOne({
    itemId, // the current item
    claimerId: userID, // the current user and also == item.reportedby
    requestType: "found", // claim
  });

  if (foundRequest) {
    foundRequest.requestType = "claim";
    await foundRequest.save();
    const updatedFoundRequest = await requestModel.findById(foundRequest.id);
    res.status(200).json(updatedFoundRequest);
  } else {
    const requestExists = await requestModel.findOne({
      itemId,
      finderId,
      claimerId: userID,
      requestType: "claim",
    });

    const foundRequestExists = await requestModel.findOne({
      itemId,
      claimerId: item.reportedBy,
    });

    if (foundRequestExists) {
      // checking if the finder who sends a found request initially
      // is trying to make a claim request of the item they find
      if (userID == foundRequestExists.finderId.toString()) {
        res.status(404);
        throw new Error("Can't claim the item you found!");
      }
    }

    // checking if the there is claim request for the same item by the same finder and claimer
    if (requestExists) {
      res.status(400);
      throw new Error("You already sent a claim request for this item!");
    }

    // checking if the current user id matches the id of who reported the item
    // in order to prevent the user who posted an item from making a claim request on the item they posted
    if (userID == item.reportedBy.toString()) {
      res.status(403);
      throw new Error("You can't claim an item you posted");
    }

    const request = await requestModel.create({
      itemId,
      finderId,
      claimerId: userID,
      requestType: "claim",
    });

    res.status(201).json(request);
  }
};
const sendFoundRequest = async (req, res) => {
  const { id: userID } = req.user;
  const { id: itemId } = req.item;
  const item = await itemModel.findById(itemId);
  const claimerId = item.reportedBy;

  const requestExists = await requestModel.findOne({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
  });

  if (requestExists) {
    res.status(400);
    throw new Error("You already sent a found request for this item!");
  }

  if (item.status != "lost") {
    res.status(400);
    throw new Error("Can only send a found request to a lost item");
  }

  const request = await requestModel.create({
    itemId,
    finderId: userID,
    claimerId,
    requestType: "found",
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
  const { id: requestId, itemId } = req.requestObject;
  // const { itemId } = req.requestObject;
  let { value: decision } = req.body.decision;
  let finderCode = "";
  let claimerCode = "";

  const request = await requestModel.findById(requestId);
  const item = await itemModel.findById(itemId);

  if (!decision) {
    res.status(400);
    throw new Error("Decision can't be blank!");
  }

  if (decision != "accept" && decision != "reject") {
    res.status(400);
    throw new Error("Decision can either be accept or reject");
  }

  if (decision == "accept") {
    item.status = "claimed";
    for (let i = 1; i <= 4; i++) {
      finderCode += Math.floor(Math.random() * 10);
      claimerCode += Math.floor(Math.random() * 10);
    }
    request.finderCode = finderCode;
    request.claimerCode = claimerCode;
    await item.save();
  }

  decision += "ed";
  request.status = decision;
  await request.save();
  const updatedRequest = await requestModel.findById(requestId);
  res.status(200).json(updatedRequest);
};
const handleItem = async (req, res) => {
  const { requestId } = req.params;
  const { id: userID } = req.user;
  const { code } = req.body.verification;
  // checking if the requestId is valid
  if (validateId(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
  }
  const request = await requestModel.findOne({
    _id: requestId,
    $or: [{ finderId: userID }, { claimerId: userID }],
    status: "accepted",
  });

  // checking if there's no request
  if (!request) {
    res.status(404);
    throw new Error("Request not found!");
  }

  const item = await itemModel.findById(request.itemId);
  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }

  if (request.status == "returned") {
    res.status(403);
    throw new Error("Item already returned");
  }

  // checking if the current user is the finder
  if (userID.toString() == request.finderId.toString()) {
    // checking if the finder code is not equal to the claimer code
    if (code != request.claimerCode) {
      res.status(400);
      throw new Error("Invalid code,try again.");
    }

    if (request.claimerVerified) {
      res.status(400);
      throw new Error("Claimer already verified!");
    }
    // verifying the claimer
    request.claimerVerified = true;
  } else if (userID.toString() == request.claimerId.toString()) {
    if (code != request.finderCode) {
      res.status(400);
      throw new Error("Invalid code,try again.");
    }

    if (request.finderVerified) {
      res.status(400);
      throw new Error("Finder already verified!");
    }

    request.finderVerified = true;
  } else {
    res.status(403);
    throw new Error("Forbidden, not authorized!");
  }

  await request.save();
  const updatedRequest = await requestModel.findById(requestId);

  if (updatedRequest.finderVerified && updatedRequest.claimerVerified) {
    updatedRequest.status = "returned";
    item.status = "returned";
    await item.save();
    await updatedRequest.save();
    const finalRequestDoc = await requestModel.findById(requestId);
    res.status(200).json(finalRequestDoc);
  } else {
    res.status(200).json(updatedRequest);
  }
};

export {
  claimItem,
  sendFoundRequest,
  getAllRequests,
  setRequestQuestions,
  setRequestAnswers,
  setRequestDecision,
  handleItem,
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
