import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtUtils.js";

export const createUser = async (req, res) => {
  const { email, nickname, password } = req.body;

  if (!email || !nickname || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "A user with this email already exists." });
    }

    const newUser = new User({ email, nickname, password });
    await newUser.save();
    res.status(StatusCodes.CREATED).json({ message: "User has been created." });
  } catch (error) {
    console.log("CreateUserError: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password." });
    }
    const { _id } = user;
    const accessToken = generateAccessToken({ _id });
    const refreshToken = generateRefreshToken({ _id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });

    res.status(StatusCodes.OK).json({ message: "Tokens set in cookies" });
  } catch (error) {
    console.log("LoginError: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const logout = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found." });

    user.refreshToken = "";
    await user.save();

    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "Strict",
    });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      path: "/",
      sameSite: "Strict",
    });

    res.status(StatusCodes.OK).json({ message: "Successfully logged out." });
  } catch (error) {
    console.log("LogoutError: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies["refresh_token"];

  try {
    const { _id } = verifyRefreshToken(refreshToken);
    console.log(_id);
    const user = await User.findById(_id);
    if (!user) {
      console.log("tu sie wywalam");
      return false;
    }

    const newAccessToken = generateAccessToken({ _id });
    console.log("nowy: ", newAccessToken);
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: "/",
    });
  } catch (error) {
    console.log("RefreshAccessTokenError:", error);
    return false;
  }

  authMiddleware(req, res, next, true);
};
