import { BlacklistToken } from "../models/blacklistToken.model.js";
import { PendingUser } from "../models/pendingUser.model.js";
import { User } from "../models/user.model.js";

import generateOtp from "../utils/generateOtp.js";
import {
  sendPasswordResetEmail,
  sendRegistrationSuccessEmail,
  sendVerificationEmail,
} from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

//Register
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role, location } = req.body;
    
    if (!name || !email || !password || !phone || !role || !location) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      location
    });

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = { ...user._doc };
    delete safeUser.password;

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: safeUser,
      accessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = { ...user._doc };
    delete safeUser.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
      accessToken,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const authHeader = req.headers.authorization;
    const accessToken = authHeader?.split(" ")[1];

    if (refreshToken) await BlacklistToken.create({ token: refreshToken });
    if (accessToken) await BlacklistToken.create({ token: accessToken });

    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};