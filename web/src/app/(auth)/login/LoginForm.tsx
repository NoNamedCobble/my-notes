"use client";
import FormInput from "@/common/components/FormInput";
import { StatusCodes } from "http-status-codes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import api from "@/utils/axios";

interface LoginPayload {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: LoginPayload = {
        email,
        password,
      };
      const response = await api.post("users/login", payload);

      if (response.status === StatusCodes.OK) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("LoginError: ", err);
      setEmail("");
      setPassword("");
      setIsError(true);
    }
  };

  return (
    <form
      onSubmit={(e) => handleLogin(e)}
      className="mx-auto flex max-w-sm flex-col items-start portrait:max-w-lg"
    >
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
      <button
        type="submit"
        className="bg-primary text-secondary self-center rounded-full px-10 py-2 text-xl md:text-2xl"
      >
        Login
      </button>
      <p className="text-tertiary m-1 self-center text-base md:text-lg">
        Don't have account?
        <Link
          href="/signup"
          className="text-primary inline-block p-2 font-medium"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
