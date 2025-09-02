import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of item is required"],
  },
  description: {
    type: String,
    required: [true, "Item description is required"],
  },
});
