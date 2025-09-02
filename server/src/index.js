import express from "express";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();

app.get("/api/v1/welcome", async (req, res) => {
  res.json({ message: "working" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server up and running on port: " + PORT);
});
