import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async (DATABASE_URI) => {
  const connection = await mongoose.connect(DATABASE_URI);
  console.log("Database connected to " + connection.connection.host);
};

export default connectDB;
