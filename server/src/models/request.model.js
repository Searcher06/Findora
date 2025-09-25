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
      enum: ["pending", "rejected", "accepted", "returned"],
      default: "pending",
    },
    questions: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    finderCode: {
      type: Number,
    },
    claimerCode: {
      type: Number,
    },
    decisionAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const requestModel = mongoose.model("Request", schema);
