import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.routes.js";
import itemRoute from "./routes/items.routes.js";
import requestRoute from "./routes/requests.routes.js";
import messageRoute from "./routes/message.routes.js";
import adminRoute from "./routes/admin.routes.js";
import flagRoute from "./routes/flags.routes.js";
import cookieParser from "cookie-parser";
import loggerMiddleware from "./middleware/logger.js";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors";
import { app, server } from "./lib/socket.js";

app.use(express.json());
const PORT = process.env.PORT || 8080;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/Findora";

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Logger middleware
app.use(loggerMiddleware);

// user route
app.use("/api/v1/user", userRoute);

// items route
app.use("/api/v1/items", itemRoute);

// item claim/found request route
app.use("/api/v1/request", requestRoute);

// message route
app.use("/api/v1/chat", messageRoute);

// user-created moderation flags route
app.use("/api/v1/flags", flagRoute);

// admin route
app.use("/api/v1/admin", adminRoute);

// api testing
app.get("/api/v1/welcome", async (req, res) => {
  res.status(200).json({ message: "welcome to the server" });
});

// Error Handler middleware
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB(DATABASE_URI);
    server.listen(PORT, "0.0.0.0", () => {
      console.log("Server up and running on port: " + PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
