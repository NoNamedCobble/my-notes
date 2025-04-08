import { loginSchema, signupSchema, noteSchema } from "@/common/schemas";
import { z } from "zod";

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type NoteData = z.infer<typeof noteSchema>;

export interface Position {
  x: number;
  y: number;
}

export interface NoteProps {
  _id: string;
  title: string;
  content: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface LayoutProps {
  children: React.ReactNode;
}
