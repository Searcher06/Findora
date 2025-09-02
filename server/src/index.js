import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { userModel } from "./models/user.model.js";
dotenv.config();
const PORT = process.env.PORT || 8080;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/Findora";
const app = express();

app.get("/api/v1/welcome", async (req, res) => {
  res.json({ message: "working" });
});

connectDB(DATABASE_URI);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server up and running on port: " + PORT);
});
