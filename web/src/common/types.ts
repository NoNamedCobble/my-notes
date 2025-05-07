import {
  forgotPasswordSchema,
  loginSchema,
  noteSchema,
  resetPasswordSchema,
  signupSchema,
} from "@/common/schemas";
import { AxiosError } from "axios";
import { ComponentProps } from "react";
import { Control } from "react-hook-form";
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

export interface FormInputProps extends ComponentProps<"input"> {
  control: Control<any>;
  name: string;
  iconSrc: string;
}

export interface ApiResponse {
  message: string;
}

export type ApiErrorResponse = AxiosError<ApiResponse>;
