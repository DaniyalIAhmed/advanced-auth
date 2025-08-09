import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

export const protectRoute = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  const payload = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const { id } = payload as any;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user: user.toObject() });
  } catch (error) {
    console.error("Error in protectRoute middleware:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
