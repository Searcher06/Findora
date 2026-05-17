import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (DATABASE_URI) => {
  const connection = await mongoose.connect(DATABASE_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
  console.log("Database connected to " + connection.connection.host);
};

export default connectDB;
