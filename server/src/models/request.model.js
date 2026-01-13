import mongoose from "mongoose";

// Message Schema first
const messageSchema = new mongoose.Schema(
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
    text: { type: String, trim: true },
    image: { type: String },
  },
  { timestamps: true }
);

const schema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    requestType: {
      type: String, // Changed "string" to String (Mongoose standard)
      enum: ["claim", "found"],
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

    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    status: {
      type: String,
      enum: ["pending", "accepted", "returned"],
      default: "pending",
    },

    //  Verification Logic
    finderCode: String,
    claimerCode: String,
    finderVerified: { type: Boolean, default: false },
    claimerVerified: { type: Boolean, default: false },
    decisionAt: Date,

    //  Embedded Chat Logic
    conversation: [messageSchema],

    // Last message for quick preview
    lastMessage: {
      text: String,
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    lastMessageAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Optimized Index for the Inbox
schema.index({ participants: 1, lastMessageAt: -1 });

// Hook to automatically fill the participants array
schema.pre("save", function (next) {
  if (this.isNew) {
    this.participants = [this.finderId, this.claimerId];
  }
  next();
});

export const requestModel = mongoose.model("Request", schema);
