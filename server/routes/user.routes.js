import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getUserProfile, getAllUsers } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, getUserProfile);
userRouter.get("/all", authMiddleware, getAllUsers);

export default userRouter;
