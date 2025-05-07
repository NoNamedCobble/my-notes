"use client";
import { forgotPasswordSchema } from "@/common/schemas";
import { ForgotPasswordData } from "@/common/types";
import { forgotPassword } from "@/services/api/auth";
import GenericAuthForm from "./GenericAuthForm";

export default function ForgotPasswordForm() {
  return (
    <GenericAuthForm<ForgotPasswordData>
      schema={forgotPasswordSchema}
      title="Forgot password"
      submit={{
        action: forgotPassword,
        redirectPath: "/login",
        buttonTitle: "Continue",
      }}
      inputs={[
        {
          name: "email",
          iconSrc: "images/email.svg",
          placeholder: "Email",
          type: "email",
        },
      ]}
      footer={{
        text: "Remember your password?",
        link: {
          href: "/login",
          text: "Log in",
        },
      }}
    />
  );
}
