import { requestModel } from "../models/request.model.js";
import mongoose from "mongoose";

export const basicRequestMiddleware = async (req, res, next) => {
  const { requestId } = req.params;
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

  req.requestObject = await requestModel.findById(request.id);
  next();
};
export const requestDecisionMiddleware = async (req, res, next) => {
  const { requestObject: request, user } = req;
  // checking if the current user id matches the finder Id
  // cause only the finder can decide whether to accept claim
  if (request.finderId.toString() != user.id.toString()) {
    res.status(403);
    throw new Error("Forbidden, not authorized!");
  }

  if (request.status == "returned") {
    res.status(400);
    throw new Error("Item Already returned!");
  }
  req.requestObject = await requestModel.findById(request.id);
  next();
};
