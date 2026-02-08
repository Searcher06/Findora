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
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  displayUsername: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
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
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: {
    type: String,
  },
  emailVerificationExpires: {
    type: Date,
  },
  role: {
    type: String,
    default: "student",
  },
  department: {
    type: String,
    trim: true,
  },
  foculty: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Creating a model
export const userModel = mongoose.model("User", schema);
