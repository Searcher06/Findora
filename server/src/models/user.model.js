import mongoose from "mongoose";

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Email is invalid"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  role: {
    type: String,
    default: "student",
  },
});

// Creating a model
export const userModel = mongoose.model("User", schema);
