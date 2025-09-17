import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    finderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    claimerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "accepted"],
      default: "pending",
    },
    questions: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    decisionAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const requestModel = mongoose.model("Request", schema);
