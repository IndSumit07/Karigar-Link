import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getChatHistory,
  sendMessage,
  getConversations,
} from "../controllers/chat.controller.js";

const chatRouter = express.Router();

chatRouter.get("/conversations", authMiddleware, getConversations);
chatRouter.get("/:userId", authMiddleware, getChatHistory);
chatRouter.post("/send", authMiddleware, sendMessage);

export default chatRouter;
