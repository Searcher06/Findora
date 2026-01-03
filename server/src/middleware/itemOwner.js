import { itemModel } from "../models/item.model.js";
import mongoose from "mongoose";

export const itemMiddleware = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid item ID");
  }
  const item = await itemModel.findById(id);

  // checking if there's no item
  if (!item) {
    res.status(404);
    throw new Error("Item not found!");
  }

  req.item = await itemModel.findById(item.id);
  next();
};
