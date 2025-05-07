import {
  ForgotPasswordData,
  LoginData,
  ResetPasswordData,
  SignupData,
} from "@/common/types";
import { api } from "@/services/api/instance";

interface ApiResponse {
  message: string;
}

export async function login(data: LoginData) {
  const response = await api.post<ApiResponse>("/users/login", data);
  return response.data;
}

export async function signup(data: SignupData) {
  const response = await api.post<ApiResponse>("/users/signup", data);
  return response.data;
}

export async function logout() {
  const response = await api.post<ApiResponse>("/users/logout");
  return response.data;
}

export async function verifyEmail(token: string) {
  const response = await api.post<ApiResponse>("/users/verify-email", {
    token,
  });
  return response.data;
}

export async function resetPassword(
  data: ResetPasswordData & { token: string },
) {
  const response = await api.post<ApiResponse>("/users/reset-password", data);
  return response.data;
}

export async function forgotPassword(data: ForgotPasswordData) {
  const response = await api.post<ApiResponse>("/users/forgot-password", data);
  return response.data;
}
