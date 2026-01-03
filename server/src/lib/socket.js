import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});

// used to store online users
const userSocketMap = {};
export const getRecieverSocketId = (username) => {
  return userSocketMap[username];
};

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const currentUser_username = socket.handshake.query.username;

  if (currentUser_username) {
    userSocketMap[currentUser_username] = socket.id;
    console.log(currentUser_username);
  }

  socket.on("disconnect", () => {
    delete userSocketMap[currentUser_username];
    console.log("A user disconnected", socket.id);
  });
});

export { io, app, server };
