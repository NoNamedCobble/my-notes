import { z } from "zod";

const passwordField = z
  .string()
  .min(4, "Password must be at least 4 characters long.")
  .max(50);

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
});

export const loginSchema = forgotPasswordSchema.extend({
  password: passwordField,
});

export const signupSchema = loginSchema.extend({
  nickname: z.string().min(1, "Username is required."),
});

export const resetPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmNewPassword: passwordField,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords must match.",
    path: ["confirmNewPassword"],
  });

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  background: z.string(),
});
