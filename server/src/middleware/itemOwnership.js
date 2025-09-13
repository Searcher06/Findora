import { userModel } from "../models/user.model.js";
import { itemModel } from "../models/item.model.js";

export const ownerShipMiddleware = async (req, res, next) => {
  const id = req.params.id;
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
