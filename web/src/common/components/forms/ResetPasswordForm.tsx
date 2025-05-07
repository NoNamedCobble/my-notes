"use client";
import { resetPasswordSchema } from "@/common/schemas";
import { ResetPasswordData } from "@/common/types";
import { resetPassword } from "@/services/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import GenericAuthForm from "./GenericAuthForm";

export default function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  useEffect(() => {
    if (!token) {
      return router.push("/login");
    }
  }, [token, router]);

  if (!token) return;

  return (
    <GenericAuthForm<ResetPasswordData>
      schema={resetPasswordSchema}
      title="Change your password"
      submit={{
        action: (data) => resetPassword({ token, ...data }),
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
