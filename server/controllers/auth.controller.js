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
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No refresh token" });

    const isBlacklisted = await BlacklistToken.findOne({ token });
    if (isBlacklisted)
      return res
        .status(403)
        .json({ success: false, message: "Token blacklisted" });

    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const { accessToken } = generateTokens(decoded.id);

    res.json({ success: true, accessToken });
  } catch (error) {
    res
      .status(403)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }
};

//Register
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await PendingUser.findOne({ email });

    if (existingUser) {
      await PendingUser.deleteOne({ email });
    }

    const otp = generateOtp();
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedOtp = await bcrypt.hash(otp, 10);

    const pendingUser = await PendingUser.create({
      fullname,
      email,
      password: hashedPassword,
      registrationOtp: hashedOtp,
    });
    await pendingUser.save();
    await sendVerificationEmail(email, otp);

    res
      .status(201)
      .json({ success: true, message: "Verification email sent." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

//Verify Registration OTP
export const verifyRegistrationOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const pendingUser = await PendingUser.findOne({ email });
    if (!pendingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Session Expired, Register Again" });
    }
    const isOtpValid = await bcrypt.compare(otp, pendingUser.registrationOtp);
    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const user = await User.create({
      fullname: pendingUser.fullname,
      email: pendingUser.email,
      password: pendingUser.password,
    });
    await user.save();
    await PendingUser.deleteOne({ email });
    await sendRegistrationSuccessEmail(
      email,
      pendingUser.fullname.firstname + " " + pendingUser.fullname.lastname
    );
    res
      .status(200)
      .json({ success: true, message: "Registration verified successfully." });
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
      secure: true,
      sameSite: "strict",
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

export const sentForgotPasswordEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const otp = generateOtp();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp.code = hashedOtp;
    user.otp.subject = "Password Reset OTP";
    user.otp.expiresAt = Date.now() + 60 * 60 * 1000;
    await user.save();

    await sendPasswordResetEmail(email, otp);
    res
      .status(200)
      .json({ success: true, message: "Password reset OTP sent." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const verifyPasswordResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required" });
    }
    const user = await User.findOne({ email });
    if (!user || !user.otp.code) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });
    }
    if (user.otp.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    const isOtpValid = await bcrypt.compare(otp, user.otp.code);
    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    user.otp.isVerified = true;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = {};
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
