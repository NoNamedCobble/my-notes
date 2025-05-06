import { LoginData, SignupData } from "@/common/types";
import { api } from "@/services/api/instance";

interface ApiResponse {
  message: string;
}

export async function login(data: LoginData) {
  const response = await api.post<ApiResponse>("/users/login", data);
  return response;
}

export async function signup(data: SignupData) {
  const response = await api.post<ApiResponse>("/users/signup", data);
  return response;
}

export async function logout() {
  const response = await api.post<ApiResponse>("/users/logout");
  return response;
}

export async function verifyEmail(token: string) {
  const response = await api.post<ApiResponse>("/users/verify-email", {
    token,
  });
  return response.data;
}
