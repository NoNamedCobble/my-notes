import jwt from "jsonwebtoken";
export const generateAccessToken = (data) =>
  jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

export const generateRefreshToken = (data) =>
  jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

export const generateVerificationToken = (data) =>
  jwt.sign(data, process.env.VERIFICATION_TOKEN_SECRET, {
    expiresIn: process.env.VERIFICATION_TOKEN_EXPIRES_IN,
  });

export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

export const verifyVerificationToken = (token) =>
  jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
