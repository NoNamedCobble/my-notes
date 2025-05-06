import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import {
  sendEmailVerificationLink,
  sendPasswordResetLink,
} from "../services/mailer.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifyEmailVerificationToken,
  verifyPasswordResetToken,
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
      return res.status(StatusCodes.CONFLICT).json({
        message: "A user with this email or nickname already exists.",
      });
    }

    const newUser = new User({ email, nickname, password });
    await newUser.save();

    sendEmailVerificationLink({ email, nickname, _id: newUser._id });

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

    const { _id, nickname } = user;
    if (!user.isVerified) {
      sendEmailVerificationLink({ email, nickname, _id });
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Your account has not been verified. Please check your email.",
      });
    }

    const accessToken = generateAccessToken({ _id });
    const refreshToken = generateRefreshToken({ _id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: process.env.COOKIES_EXPIRES_IN,
      path: "/",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: process.env.COOKIES_EXPIRES_IN,
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

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not found." });
    }

    if (user.refreshToken === "") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "You are logout." });
    }

    const newAccessToken = generateAccessToken({ _id });
    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: true,
      maxAge: process.env.COOKIES_EXPIRES_IN,
      path: "/",
    });

    req.userId = _id;
    next();
  } catch (error) {
    console.log("RefreshAccessTokenError:", error);
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid access token." });
  }
};

export const changePassword = async (req, res) => {
  const { userId } = req;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required." });
  }

  try {
    const user = await User.findById(userId);
    if (!user || !(await user.comparePassword(oldPassword))) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Old password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Successfully password changed." });
  } catch (error) {
    console.log("ChangePasswordError: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Token is required." });
  }

  try {
    const { _id } = verifyEmailVerificationToken(token);

    const user = await User.findOneAndUpdate(
      { _id, isVerified: false },
      {
        $set: { isVerified: true },
      }
    );

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not found." });
    }

    res
      .status(StatusCodes.OK)
      .json({ message: "Your account has been successfully verified." });
  } catch (error) {
    console.log("VerifyEmail: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not found." });
    }

    const { _id, nickname } = user;
    sendPasswordResetLink({ email, _id, nickname });

    res.status(StatusCodes.OK).json({
      message:
        "Password reset request successful! Check your inbox for a reset linkCheck your inbox for a password reset link.",
    });
  } catch (error) {
    console.log("RequestPasswordReset: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required." });
  }

  try {
    const { _id } = verifyPasswordResetToken(token);
    const user = await User.findOne({ _id, isVerified: true });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "User not found." });
    }

    user.password = newPassword;

    await user.save();

    res
      .status(StatusCodes.OK)
      .json({ message: "Password successfully changed!" });
  } catch (error) {
    console.log("ResetPassword: ", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server error. Please try again later." });
  }
};
