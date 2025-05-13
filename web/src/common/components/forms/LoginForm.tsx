"use client";
import { loginSchema } from "@/common/schemas";
import { LoginData } from "@/common/types";
import { login } from "@/services/api/auth";
import GenericAuthForm from "./GenericAuthForm";

export default function LoginForm() {
  return (
    <GenericAuthForm<LoginData>
      schema={loginSchema}
      title="Login"
      submit={{
        action: login,
        redirectPath: "/dashboard",
        buttonTitle: "Login",
      }}
      inputs={[
        {
          name: "email",
          iconSrc: "images/email.svg",
          placeholder: "Email",
          type: "email",
        },
        {
          name: "password",
          iconSrc: "images/password.svg",
          placeholder: "Password",
          type: "password",
        },
      ]}
      auxiliaryLink={{
        text: "Forgot Password?",
        href: "/forgot-password",
      }}
      footer={{
        text: "Don't have an account?",
        link: {
          href: "/signup",
          text: "Sign Up",
        },
      }}
    />
  );
}
