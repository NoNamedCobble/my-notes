import User from "../models/User.js";

import { refreshAccessToken } from "../controllers/userController.js";
import { verifyAccessToken } from "../utils/jwtUtils.js";

import { StatusCodes } from "http-status-codes";

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.cookies["access_token"];

  if (!accessToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access tokens are missing" });
  }

  try {
    const { _id } = verifyAccessToken(accessToken);

    const user = await User.findById(_id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "User not found." });
    }

    if (user.refreshToken === "") {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "You are logout." });
    }

    req.userId = _id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return await refreshAccessToken(req, res, next);
    }

    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid access token." });
  }
};
