import nodemailer from "nodemailer";
import { generateEmailVerificationToken, generatePasswordResetToken } from "../utils/jwtUtils.js";

const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `My Notes <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  };

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  return await transporter.sendMail(mailOptions);
};

export const sendEmailVerificationLink = ({ email, nickname, _id }) => {
  const token = generateEmailVerificationToken({
    _id,
  });
  const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    to: email,
    subject: "Account Verification",
    html: `
        <p>Hi, ${nickname}!</p>
        <p>Thank you for signing up for <strong>MyNotes</strong>! We're excited to have you join our community.</p>
        <p>To complete your registration, please verify your email address by clicking the link below:</p>
        <p><a href="${link}">Verify My Email</a></p>
        <p>If you didn't sign up for an account with us, you can safely ignore this email.</p>
        <p>Best regards, <strong>My Notes Team</strong></p>
    `,
  };

  sendMail(mailOptions);
};

export const sendPasswordResetLink = ({ email, nickname, _id }) => {
  const token = generatePasswordResetToken({
    _id,
  });

  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
  const mailOptions = {
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>Hi, ${nickname}!</p>
      <p>We received a request to reset your password for your account on <strong>MyNotes</strong>.</p>
      <p>To reset your password, please click the link below:</p>
      <p><a href="${link}">Reset My Password</a></p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>Best regards, <strong>My Notes Team</strong></p>
    `,
  };

  sendMail(mailOptions);
};
