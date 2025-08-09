import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import {
  generateTokenAndSetCookie,
  generateVerificationToken,
} from "../lib/utils";
import { sendVerficationEmail, sendWelcomeEmail } from "../lib/emails";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const verificationCode = generateVerificationToken();
  await sendVerficationEmail(email, verificationCode);
  const newUser = new User({
    userName: username,
    email,
    password,
    verificationToken: verificationCode,
    verificationExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
  await newUser.save();
  generateTokenAndSetCookie(res, newUser._id);
  res.status(201).json({
    message: "User registered successfully",
    user: { ...newUser.toObject(), password: undefined },
  });
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      message: "Login successful",
      user: { ...user.toObject(), password: undefined },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const verifyMail = async (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res
      .status(400)
      .json({ message: "Email and verification code are required" });
  }
  const user = await User.findOne({
    verificationToken: code,
    verificationExpiresAt: { $gt: new Date() },
  });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Invalid or expired verification code" });
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationExpiresAt = undefined;
  await user.save();
  await sendWelcomeEmail(user.email, user.userName);
  res.status(200).json({
    message: "Email verified successfully",
    user: { ...user.toObject(), password: undefined },
  });
};
