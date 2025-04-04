import { api } from "@/api/instance";
import { LoginData, SignupData } from "@/common/types";

export async function login(data: LoginData) {
  const response = await api.post("/users/login", data);
  return response;
}

export async function signup(data: SignupData) {
  const response = await api.post("/users/signup", data);
  return response;
}
