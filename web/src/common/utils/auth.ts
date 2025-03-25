import { callApi } from "@/common/utils/api";
import { z } from "zod";
import { loginSchema, signupSchema } from "@/common/utils/schemas";

type LoginPayload = z.infer<typeof loginSchema>;
export async function login(data: LoginPayload) {
  const response = await callApi({ method: "POST", url: "/users/login", data });
  return response;
}

type SignupPayload = z.infer<typeof signupSchema>;
export async function signup(data: SignupPayload) {
  const response = await callApi({
    method: "POST",
    url: "/users/signup",
    data,
  });
  return response;
}
