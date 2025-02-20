import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const createUser = async (req, res) => {
  const { email, nickname, password } = req.body;

  try {
    const newUser = new User({ email, nickname, password });
    await newUser.save();
    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid credentials");
    }

    const { _id } = user;

    const accessToken = jwt.sign({ _id }, process.env.TOKEN_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign({ _id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "24h",
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const logout = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findById(_id);
    user.refreshToken = "";
    await user.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const decodedId = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedId);
    if (user.refreshToken === "") {
      throw new Error("You are logged out");
    }

    if (user.refreshToken !== refreshToken) {
      throw new Error("Incorrect refresh token");
    }
    const { _id } = user;
    const accessToken = jwt.sign({ _id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.send({ accessToken });
  } catch (error) {
    res.sendStatus(401);
  }
};
