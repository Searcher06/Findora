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
      type: String,
    },
    claimerCode: {
      type: String,
    },

    finderVerified: {
      type: Boolean,
      default: false,
    },
    claimerVerified: {
      type: Boolean,
      default: false,
    },
    decisionAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const requestModel = mongoose.model("Request", schema);
