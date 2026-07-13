import mongoose from "mongoose";

const connectDB = async (DATABASE_URI) => {
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("MongoDB reconnected");
  });

  const connection = await mongoose.connect(DATABASE_URI, {
    serverSelectionTimeoutMS: 10000, // fail fast if Atlas is unreachable
    socketTimeoutMS: 45000,
  });

  console.log("Database connected to " + connection.connection.host);
};

export default connectDB;
