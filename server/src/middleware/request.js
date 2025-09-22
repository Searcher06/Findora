import { requestModel } from "../models/request.model.js";
import { userModel } from "../models/user.model.js";
import mongoose from "mongoose";
export const setRequestVerificationMiddleware = async (req, res, next) => {
  const { requestId } = req.params;
  const { id: userID } = req.user;
  // checking if the requestId is valid
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
  }
  const request = await requestModel.findById(requestId);

  // checking if there's no request
  if (!request) {
    res.status(404);
    throw new Error("Request not found!");
  }

  // checiking if the current user id matches the finder Id
  // cause only the finder can generate verification questions about the item
  if (request.finderId.toString() != userID.toString()) {
    res.status(403);
    throw new Error("Forbidden, not authorized!");
  }

  if (request.questions[0]) {
    res.status(403);
    throw new Error("Item request already have questions");
  }

  if (request.status == "accepted") {
    res.status(400);
    throw new Error("This request was already accepted");
  }

  if (request.status == "rejected") {
    res.status(400);
    throw new Error("This request was already rejected");
  }

  req.requestObject = await requestModel.findById(request.id);

  next();
};
export const setVerificationAnswersMiddleware = async (req, res, next) => {
  const { requestId } = req.params;
  const { id: userID } = req.user;
  // checking if the requestId is valid
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
  }
  const request = await requestModel.findById(requestId);

  // checking if there's no request
  if (!request) {
    res.status(404);
    throw new Error("Request not found!");
  }

  // checking if the claimer ID matches the logged in user
  // cause only the item claimer can answer questions based on the item
  if (request.claimerId.toString() != userID.toString()) {
    res.status(403);
    throw new Error("Forbidden, not authorized!");
  }

  if (request.status == "accepted") {
    res.status(400);
    throw new Error("This request was already accepted");
  }

  if (request.status == "rejected") {
    res.status(400);
    throw new Error("This request was already rejected");
  }

  if (request.questions[0]) {
    res.status(400);
    throw new Error(
      "The request is already assigned with answer\nwait for the finders decision"
    );
  }

  req.requestObject = await requestModel.findById(request.id);

  next();
};
export const requestDecisionMiddleware = async (req, res, next) => {
  const { requestId } = req.params;
  const { id: userID } = req.user;
  // checking if the requestId is valid
  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    res.status(400);
    throw new Error("Invalid request ID");
  }
  const request = await requestModel.findById(requestId);

  // checking if there's no request
  if (!request) {
    res.status(404);
    throw new Error("Request not found!");
  }

  // checiking if the current user id matches the finder Id
  // cause only the finder can decide whether to accept or reject a claim
  if (request.finderId.toString() != userID.toString()) {
    res.status(403);
    throw new Error("Forbidden, not authorized!");
  }

  // checking if request lack question or answer
  if (!request.questions[0] || !request.questions[0].answer) {
    res.status(400);
    throw new Error(
      "Decision can only be made when request has questions with answer"
    );
  }

  if (request.status == "accepted") {
    res.status(400);
    throw new Error("This request was already accepted");
  }

  if (request.status == "rejected") {
    res.status(400);
    throw new Error("This request was already rejected");
  }

  req.requestObject = await requestModel.findById(request.id);
  next();
};
