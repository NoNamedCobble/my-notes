import { loginSchema, noteSchema, signupSchema } from "@/common/schemas";
import { z } from "zod";

export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;

export type NoteWithoutId = z.infer<typeof noteSchema>;
export interface Note extends NoteWithoutId {
  _id: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface LayoutProps {
  children: React.ReactNode;
}
