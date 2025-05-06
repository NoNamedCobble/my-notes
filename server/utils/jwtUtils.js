import jwt from "jsonwebtoken";
export const generateAccessToken = (data) =>
  jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });

export const generateRefreshToken = (data) =>
  jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  });

export const generateEmailVerificationToken = (data) =>
  jwt.sign(data, process.env.EMAIL_VERIFICATION_TOKEN_SECRET, {
    expiresIn: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
  });

export const generatePasswordResetToken = (data) =>
  jwt.sign(data, process.env.PASSWORD_RESET_TOKEN_SECRET, {
    expiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN,
  });

export const verifyAccessToken = (token) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

export const verifyEmailVerificationToken = (token) =>
  jwt.verify(token, process.env.EMAIL_VERIFICATION_TOKEN_SECRET);

export const verifyPasswordResetToken = (token) =>
  jwt.verify(token, process.env.PASSWORD_RESET_TOKEN_SECRET);
