"use client";
import FormInput from "@/common/components/FormInput";
import api from "@/utils/axios";
import { StatusCodes } from "http-status-codes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignupPayload {
  email: string;
  nickname: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: SignupPayload = {
        email,
        nickname,
        password,
      };
      const response = await api.post("users/signup", payload);

      if (response.status === StatusCodes.CREATED) {
        router.push("/login");
      }
    } catch (err) {
      console.log("SignupError: ", err);
      setEmail("");
      setNickname("");
      setPassword("");
      setIsError(true);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSignup(e)}
      className="mx-auto flex max-w-sm flex-col items-start portrait:max-w-lg"
    >
      <h2 className="mb-3 text-2xl font-semibold md:mb-6 md:text-3xl lg:self-center lg:text-4xl">
        Create an account
      </h2>
      <FormInput
        title="email"
        type="email"
        iconSrc="images/email.svg"
        value={email}
        setValue={setEmail}
      />
      <FormInput
        title="nickname"
        type="text"
        iconSrc="images/password.svg"
        value={nickname}
        setValue={setNickname}
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
        Sign up
      </button>
      <p className="text-tertiary m-1 self-center text-base md:text-lg">
        Already have an account?
        <Link
          href="/login"
          className="text-primary inline-block p-2 font-medium"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
