import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controller.js";

const notificationRouter = express.Router();

notificationRouter.get("/", authMiddleware, getNotifications);
notificationRouter.put("/:id/read", authMiddleware, markAsRead);
notificationRouter.put("/read-all", authMiddleware, markAllAsRead);

export default notificationRouter;
