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
