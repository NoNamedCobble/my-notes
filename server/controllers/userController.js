import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { sendEmailVerificationLink, sendPasswordResetLink } from "../services/mailer.js";
import { clearCookie, handleError, setCookie, validateRequiredFields } from "../utils/apiUtils.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyEmailVerificationToken,
  verifyPasswordResetToken,
  verifyRefreshToken,
} from "../utils/jwtUtils.js";

export const createUser = async (req, res) => {
  const { email, nickname, password } = req.body;
  if (!validateRequiredFields([email, nickname, password], res)) {
    return;
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

    res.status(StatusCodes.CREATED).json({
      message: "Your account has been created. Please check your email and verify your account before logging in.",
    });
  } catch (error) {
    handleError("CreateUser", error, res);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!validateRequiredFields([email, password], res)) {
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid email or password." });
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

    setCookie("access_token", accessToken, res);
    setCookie("refresh_token", refreshToken, res);

    res.status(StatusCodes.OK).json({ message: "Successfufully logged in." });
  } catch (error) {
    handleError("Login", error, res);
  }
};

export const logout = async (req, res) => {
  const { userId } = req;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found." });

    user.refreshToken = "";
    await user.save();

    clearCookie("access_token", res);
    clearCookie("refresh_token", res);

    res.status(StatusCodes.OK).json({ message: "Successfully logged out." });
  } catch (error) {
    handleError("Logout", error, res);
  }
};

export const refreshAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies["refresh_token"];

  try {
    const { _id } = verifyRefreshToken(refreshToken);

    const user = await User.findById(_id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found." });
    }

    if (user.refreshToken === "") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are logout." });
    }

    const newAccessToken = generateAccessToken({ _id });
    setCookie("access_token", newAccessToken, res);

    req.userId = _id;
    next();
  } catch (error) {
    handleError("RefreshAccessToken", error, res);
  }
};

export const changePassword = async (req, res) => {
  const { userId } = req;
  const { oldPassword, newPassword } = req.body;

  if (!validateRequiredFields([oldPassword, newPassword], res)) {
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user || !(await user.comparePassword(oldPassword))) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Old password is incorrect." });
    }

    user.password = newPassword;
    await user.save();

    res.status(StatusCodes.OK).json({ message: "Successfully password changed." });
  } catch (error) {
    handleError("ChangePassword", error, res);
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  if (!validateRequiredFields([token], res)) {
    return;
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
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found." });
    }

    res.status(StatusCodes.OK).json({ message: "Your account has been successfully verified." });
  } catch (error) {
    handleError("VerifyEmail", error, res);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!validateRequiredFields([email], res)) {
    return;
  }

  try {
    const user = await User.findOne({ email, isVerified: true });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found." });
    }

    const { _id, nickname } = user;
    sendPasswordResetLink({ email, _id, nickname });

    res.status(StatusCodes.OK).json({
      message: "Password reset request successful! Check your inbox for a reset link.",
    });
  } catch (error) {
    handleError("ForgotPassword", error, res);
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!validateRequiredFields([token, newPassword], res)) {
    return;
  }

  try {
    const { _id } = verifyPasswordResetToken(token);
    const user = await User.findOne({ _id, isVerified: true });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found." });
    }

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({ message: "Password successfully changed!" });
  } catch (error) {
    handleError("ResetPassword", error, res);
  }
};
