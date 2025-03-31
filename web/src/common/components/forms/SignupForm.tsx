"use client";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { signup } from "@/common/utils/auth";
import { signupSchema } from "@/common/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useModal } from "@/common/hooks/useModal";
import { useState } from "react";
import WarningPopup from "@/common/components/modals/WarningPopup";

type FormFields = z.infer<typeof signupSchema>;
export default function SignupForm() {
  const router = useRouter();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<FormFields>({
      resolver: zodResolver(signupSchema),
      mode: "onSubmit",
    });
  const { isSubmitting } = formState;
  const [errorMessage, setErrorMessage] = useState("");
  const { isModalOpen, openModal, closeModal } = useModal();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { success, message } = await signup(data);
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
        className="relative mx-auto flex max-w-md flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h2 className="mb-3 text-2xl font-semibold md:text-3xl lg:self-center lg:text-4xl">
          Create an account
        </h2>
        <FormInput
          control={control}
          name="email"
          type="email"
          placeholder="Email"
          iconSrc="images/email.svg"
        />
        <FormInput
          control={control}
          name="nickname"
          placeholder="Nickname"
          iconSrc="images/person.svg"
        />
        <FormInput
          control={control}
          name="password"
          type="password"
          placeholder="Password"
          iconSrc="images/password.svg"
        />
        <Link
          href="/"
          className="mb-7 block self-end text-base font-medium md:text-lg"
        >
          Forgot Password?
        </Link>
        <SubmitButton isSubmitting={isSubmitting} title="Signup" />
        <p className="m-1 self-center text-base text-tertiary md:text-lg">
          Already have an account?
          <Link
            href="/login"
            className="inline-block p-2 font-medium text-primary"
          >
            Log in
          </Link>
        </p>
      </form>
    </>
  );
}
