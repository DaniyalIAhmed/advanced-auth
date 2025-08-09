import { Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

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
