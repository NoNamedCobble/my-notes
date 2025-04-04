"use client";
import { signup } from "@/api/auth";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { signupSchema } from "@/common/schemas";
import { SignupData } from "@/common/types";
import { usePopupStore } from "@/store/usePopupStore";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export default function SignupForm() {
  const router = useRouter();
  const { control, handleSubmit, reset, setError, formState } =
    useForm<SignupData>({
      resolver: zodResolver(signupSchema),
      mode: "onSubmit",
    });
  const { isSubmitting } = formState;
  const { openPopup } = usePopupStore();

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    try {
      const response = await signup(data);
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      const message = error.response?.data?.message ?? "Something went wrong.";
      openPopup(message);
      reset();
    }
  };
  return (
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
      <SubmitButton isSubmitting={isSubmitting} title="Sign up" />
      <p className="m-1 self-center text-base text-tertiary md:text-lg">
        Already have an account?
        <Link
          href="/login"
          className="inline-block bg-custom-linkGradient bg-cover bg-center p-2 font-medium text-primary"
        >
          Log in
        </Link>
      </p>
    </form>
  );
}
