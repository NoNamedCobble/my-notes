"use client";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { login } from "@/common/utils/auth";
import { loginSchema } from "@/common/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/common/hooks/useModal";
import WarningPopup from "../modals/WarningPopup";
import { useState } from "react";

type FormFields = z.infer<typeof loginSchema>;
export default function LoginForm() {
  const router = useRouter();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<FormFields>({
      resolver: zodResolver(loginSchema),
      mode: "onSubmit",
    });
  const { isSubmitting } = formState;
  const [errorMessage, setErrorMessage] = useState("");
  const { isModalOpen, openModal, closeModal } = useModal();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { success, message } = await login(data);
    if (success) {
      return router.push("/dashboard");
    }

    reset();
    if (message) {
      setErrorMessage(message);
      openModal();
    }
  };

  return (
    <>
      <WarningPopup
        message={errorMessage}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <form
        className="relative mx-auto flex max-w-sm flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="text-2xl font-semibold md:mb-6 md:text-3xl lg:self-center lg:text-4xl">
          Login
        </h2>
        <FormInput
          name="email"
          iconSrc="images/email.svg"
          control={control}
          placeholder="Email"
          type="email"
        />
        <FormInput
          name="password"
          iconSrc="images/password.svg"
          control={control}
          placeholder="Password"
          type="password"
        />
        <Link
          href="/"
          className="relative block self-end text-base font-medium md:text-lg"
        >
          Forgot Password?
        </Link>
        <SubmitButton isSubmitting={isSubmitting} title="Login" />
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
    </>
  );
}
