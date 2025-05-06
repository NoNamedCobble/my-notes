import nodemailer from "nodemailer";
import { generateVerificationToken } from "../utils/jwtUtils.js";

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
  const verificationToken = generateVerificationToken({
    _id,
  });
  const verificationLink = `${process.env.FRONTEND_URL}/login?token=${verificationToken}`;
  const mailOptions = {
    to: email,
    subject: "Account Verification",
    html: `
        <p>Hi, ${nickname}!</p>
        <p>Thank you for signing up for <strong>MyNotes</strong>! We're excited to have you join our community.</p>
        <p>To complete your registration, please verify your email address by clicking the link below:</p>
        <p><a href="${verificationLink}">Verify My Email</a></p>
        <p>If you didn't sign up for an account with us, you can safely ignore this email.</p>
        <p>Best regards, <strong>My Notes Team</strong></p>
    `,
  };

  sendMail(mailOptions);
};
