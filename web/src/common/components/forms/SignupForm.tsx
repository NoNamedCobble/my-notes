"use client";
import { signupSchema } from "@/common/schemas";
import { SignupData } from "@/common/types";
import { signup } from "@/services/api/auth";
import GenericAuthForm from "./GenericAuthForm";

export default function SignupForm() {
  return (
    <GenericAuthForm<SignupData>
      schema={signupSchema}
      title="Create an account"
      submit={{
        action: signup,
        redirectPath: "/login",
        buttonTitle: "Sign Up",
      }}
      inputs={[
        {
          name: "email",
          iconSrc: "images/email.svg",
          placeholder: "Email",
          type: "email",
        },
        {
          name: "nickname",
          iconSrc: "images/person.svg",
          placeholder: "Nickname",
          type: "text",
        },
        {
          name: "password",
          iconSrc: "images/password.svg",
          placeholder: "Password",
          type: "password",
        },
      ]}
      footer={{
        text: "Already have an account?",
        link: {
          href: "/login",
          text: "Log In",
        },
      }}
    />
  );
}
