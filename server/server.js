import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./configs/mongo.config.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import rfqRouter from "./routes/rfq.routes.js";
import bidRouter from "./routes/bid.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import chatRouter from "./routes/chat.routes.js";

const app = express();
const server = http.createServer(app);

connectDB();
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);
app.use(express.json());

// Make io available in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Socket.io connection handling
// Track online users: userId -> socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join_room", (userId) => {
    socket.join(userId);
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} joined room ${userId}`);
    
    // Broadcast online users list
    io.emit("get_online_users", Array.from(onlineUsers.keys()));
  });

  socket.on("send_message", (data) => {
    // data: { sender, recipient, content }
    io.to(data.recipient).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    // Remove user from onlineUsers map
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    // Broadcast updated online users list
    io.emit("get_online_users", Array.from(onlineUsers.keys()));
  });
});

app.get("/", (req, res) => {
  res.send("Hello from KarigarLink server!");
});

app.get("/ping", (req, res) => res.send("✅ Server is alive"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/rfq", rfqRouter);
app.use("/api/bids", bidRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/chat", chatRouter);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
