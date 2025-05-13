import { StatusCodes } from "http-status-codes";

export const validateRequiredFields = (fields, res) => {
  const isValid = fields.every((field) => field);
  if (!isValid) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `All fields are required.`,
    });
  }
  return isValid;
};

export const handleError = (name, error, res) => {
  console.log(`${name}Error: `, error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server error. Please try again later." });
};

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  path: "/",
};

export const setCookie = (name, value, res) => {
  res.cookie(name, value, { ...cookieOptions, maxAge: process.env.COOKIES_EXPIRES_IN });
};

export const clearCookie = (name, res) => {
  res.clearCookie(name, cookieOptions);
};
