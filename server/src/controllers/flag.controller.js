import mongoose from "mongoose";
import { adminFlagModel } from "../models/adminFlag.model.js";

const createFlag = async (req, res) => {
  const { targetType, targetId, reason } = req.body;

  if (!targetType || !reason) {
    res.status(400);
    throw new Error("targetType and reason are required");
  }

  if (!["user", "item", "request", "message", "other"].includes(targetType)) {
    res.status(400);
    throw new Error("Invalid targetType");
  }

  if (targetId && !mongoose.Types.ObjectId.isValid(targetId)) {
    res.status(400);
    throw new Error("Invalid targetId");
  }

  const flag = await adminFlagModel.create({
    targetType,
    targetId: targetId || undefined,
    reason: String(reason).trim(),
    reportedBy: req.user._id,
  });

  res.status(201).json(flag);
};

const getMyFlags = async (req, res) => {
  const flags = await adminFlagModel.find({ reportedBy: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(flags);
};

export { createFlag, getMyFlags };
