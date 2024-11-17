import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];
  try {
    const decodedId = jwt.verify(accessToken, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedId);
    if (user.refreshToken === "") {
      throw new Error("You are logged out");
    }
    req.userId = decodedId;

    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
