import express from "express";
import {
  createUser,
  login,
  logout,
  changePassword,
  verifyEmail,
  resetPassword,
  forgotPassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.post("/change-password", authMiddleware, changePassword);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
