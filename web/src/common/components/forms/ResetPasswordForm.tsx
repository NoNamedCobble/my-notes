"use client";
import { resetPassword } from "@/services/api/auth";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { resetPasswordSchema } from "@/common/schemas";
import { ResetPasswordData } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Link from "next/link";
import { useEffect } from "react";

export default function ResetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token");

  if (!token) {
    router.push("/login");
  }

  const { control, handleSubmit, reset, formState } =
    useForm<ResetPasswordData>({
      resolver: zodResolver(resetPasswordSchema),
      mode: "onSubmit",
    });
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<ResetPasswordData> = async (data) => {
    console.log(data);
    try {
      if (!token) return;
      const dataWithToken = { token, ...data };
      const { message } = await resetPassword(dataWithToken);
      toast.success(message);
      router.push("/login");
    } catch (error: any) {
      const message = error.response?.data?.message ?? "Something went wrong.";
      toast.error(message);
      reset();
    }
  };

  return (
    <form
      className="relative mx-auto flex max-w-sm flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-xl font-semibold md:mb-4 md:text-3xl lg:self-center">
        Change your password
      </h2>
      <FormInput
        name="newPassword"
        iconSrc="images/password.svg"
        control={control}
        placeholder="Password"
        type="password"
      />
      <FormInput
        name="confirmNewPassword"
        iconSrc="images/password.svg"
        control={control}
        placeholder="Confirm password"
        type="password"
      />
      <SubmitButton isSubmitting={isSubmitting} title="Submit" />
      <p className="m-1 self-center text-base text-tertiary md:text-lg">
        Remember your password?
        <Link
          href="/signup"
          className="inline-block bg-custom-linkGradient bg-cover bg-center p-2 font-medium text-primary"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
