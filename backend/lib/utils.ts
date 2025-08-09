import { Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { client, sender } from "../config/mailtrap.config";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "../config/templates/email.template";

export const generateVerificationToken = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const generateTokenAndSetCookie = (
  res: Response,
  id: Types.ObjectId
) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
export const sendPasswordResetEmail = async (email: string, link: string) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", link),
      category: "password-reset",
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};
