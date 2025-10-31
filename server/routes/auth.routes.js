import express from "express";
import {
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  sentForgotPasswordEmail,
  verifyPasswordResetOtp,
  verifyRegistrationOtp,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/verify-registration-otp", verifyRegistrationOtp);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);
authRouter.post("/forgot-password", sentForgotPasswordEmail);
authRouter.post("/verify-password-reset-otp", verifyPasswordResetOtp);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/refresh", refreshAccessToken);

export default authRouter;
