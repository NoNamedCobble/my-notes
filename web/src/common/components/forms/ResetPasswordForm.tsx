"use client";
import { resetPasswordSchema } from "@/common/schemas";
import { ResetPasswordData } from "@/common/types";
import { resetPassword } from "@/services/api/auth";
import GenericAuthForm from "./GenericAuthForm";

type ResetPasswordFormProps = {
  token: string;
};
export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  return (
    <GenericAuthForm<ResetPasswordData>
      schema={resetPasswordSchema}
      title="Change your password"
      submit={{
        action: (data) =>
          resetPassword({ token, newPassword: data.newPassword }),
        redirectPath: "/login",
        buttonTitle: "Submit",
      }}
      inputs={[
        {
          name: "newPassword",
          iconSrc: "images/password.svg",
          placeholder: "New password",
          type: "password",
        },
        {
          name: "confirmNewPassword",
          iconSrc: "images/password.svg",
          placeholder: "Confirm new password",
          type: "password",
        },
      ]}
      footer={{
        text: "Changed your mind?",
        link: {
          href: "/login",
          text: "Log in",
        },
      }}
    />
  );
}
