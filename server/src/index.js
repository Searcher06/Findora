import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import { userModel } from "./models/user.model.js";
import userRoute from "./routes/user.routes.js";
import cookieparser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/Findora";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.use("/api/v1/user", userRoute);
app.get("/api/v1/welcome", async (req, res) => {
  res.json({ message: "working" });
});

connectDB(DATABASE_URI);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server up and running on port: " + PORT);
});
