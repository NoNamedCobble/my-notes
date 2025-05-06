import express from "express";
import {
  createUser,
  login,
  logout,
  changePassword,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);

router.post("/login", login);

router.post("/logout", authMiddleware, logout);

router.post("/changepassword", authMiddleware, changePassword);

export default router;
