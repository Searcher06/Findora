import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the item name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide the item description"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Books & Stationary",
        "Bags & Accessories",
        "Clothing & Wearables",
        "ID & Cards",
        "Keys & Locks",
        "Documents",
        "Personal Items",
        "Sports & Equipment",
        "Others",
      ],
      required: true,
    },
    location: {
      type: String,
      required: [true, "Please specify the location"],
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["lost", "found", "returned"],
      required: true,
      default: "lost",
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateReported: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);
