import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long.")
    .max(50),
});

export const signupSchema = loginSchema.extend({
  nickname: z.string().min(1, "Username is required."),
});

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  background: z.string(),
});
