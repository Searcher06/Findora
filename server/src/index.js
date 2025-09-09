import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import loggerMiddleware from "./middleware/logger.js";
import { errorMiddleware } from "./middleware/error.js";

const app = express();
const PORT = process.env.PORT || 8080;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/Findora";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Logger middleware
app.use(loggerMiddleware);

// user routes
app.use("/api/v1/user", userRoute);

// api testing
app.get("/api/v1/welcome", async (req, res) => {
  res.status(200).json({ message: "working" });
});

// Error Handler middleware
app.use(errorMiddleware);

connectDB(DATABASE_URI);

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server up and running on port: " + PORT);
});
