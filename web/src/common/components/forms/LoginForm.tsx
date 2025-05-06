"use client";
import { login } from "@/services/api/auth";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { loginSchema } from "@/common/schemas";
import { LoginData } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useVerifyEmailToken } from "@/common/hooks/useVerifyEmailToken";

export default function LoginForm() {
  useVerifyEmailToken();
  const router = useRouter();
  const { control, handleSubmit, reset, formState } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const response = await login(data);
      router.push("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message ?? "Something went wrong.";
      toast.error(message);
      reset();
    }
  };

  return (
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
        href="/forgot-password"
        className="relative block self-end text-base font-medium md:text-lg"
      >
        Forgot Password?
      </Link>
      <SubmitButton isSubmitting={isSubmitting} title="Login" />
      <p className="m-1 self-center text-base text-tertiary md:text-lg">
        Don't have account?
        <Link
          href="/signup"
          className="inline-block bg-custom-linkGradient bg-cover bg-center p-2 font-medium text-primary"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
