import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyMail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller";
import { protectRoute } from "../middlewares/auth.middleware";

const router = Router();

router.get("/check", protectRoute);
router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.post("/verify-email", verifyMail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
