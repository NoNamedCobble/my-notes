import {
  forgotPasswordSchema,
  loginSchema,
  noteSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/common/schemas";
import { ComponentProps } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { z } from "zod";

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

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

export interface PaginatedNotes {
  nextPage: number | null;
  notes: Note[];
}

export interface FormInputProps<T extends FieldValues>
  extends ComponentProps<"input"> {
  control: Control<T>;
  name: Path<T>;
  iconSrc: string;
}

export interface ApiResponse {
  message: string;
}

export interface PageSearchParamsWithToken {
  searchParams: { token: string };
}
