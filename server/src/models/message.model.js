import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("Message", schema);
