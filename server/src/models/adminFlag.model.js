import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    targetType: {
      type: String,
      enum: ["user", "item", "request", "message", "other"],
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["open", "in_review", "resolved", "dismissed"],
      default: "open",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: {
      type: Date,
    },
    adminNote: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  { timestamps: true }
);

schema.index({ status: 1, createdAt: -1 });
schema.index({ targetType: 1, targetId: 1 });

export const adminFlagModel = mongoose.model("AdminFlag", schema);
