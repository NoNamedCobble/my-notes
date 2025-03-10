"use client";
import FormInput from "@/common/components/FormInput";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className="mx-auto flex max-w-sm flex-col items-start portrait:max-w-lg">
      <h2 className="mb-3 text-2xl font-semibold md:mb-6 md:text-3xl lg:self-center lg:text-4xl">
        Login
      </h2>
      <FormInput
        title="email"
        type="email"
        iconSrc="images/email.svg"
        value={email}
        setValue={setEmail}
      />
      <FormInput
        title="password"
        type="password"
        iconSrc="images/password.svg"
        value={password}
        setValue={setPassword}
        isRequired
      />
      <Link
        href="/"
        className="mb-7 block self-end text-base font-medium md:text-lg"
      >
        Forgot Password?
      </Link>
      <button className="self-center rounded-full bg-primary px-10 py-2 text-xl text-secondary md:text-2xl">
        Login
      </button>
      <p className="m-1 self-center text-base text-tertiary md:text-lg">
        Don't have account?
        <Link
          href="/signup"
          className="inline-block p-2 font-medium text-primary"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
