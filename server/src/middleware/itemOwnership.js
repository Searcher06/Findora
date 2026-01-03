import { userModel } from "../models/user.model.js";
import { itemModel } from "../models/item.model.js";
import mongoose from "mongoose";

export const ownerShipMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }
  const item = await itemModel.findById(id);
  const user = await userModel.findById(req.user._id);

  // checking if there's no item
  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }

  if (item.reportedBy.toString() !== user._id.toString()) {
    res.status(403);
    throw new Error("Forbidden, Not authorized!");
  }

  req.item = await itemModel.findById(item.id);
  next();
};

export const notOwnerShipMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }
  const item = await itemModel.findById(id);
  const user = await userModel.findById(req.user._id);

  // checking if there's no item
  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }

  if (item.reportedBy.toString() == user._id.toString()) {
    res.status(403);
    throw new Error("Forbidden, Not authorized!");
  }

  req.item = await itemModel.findById(item.id);
  next();
};
