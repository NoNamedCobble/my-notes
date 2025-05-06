"use client";
import { forgotPassword } from "@/services/api/auth";
import FormInput from "@/common/components/FormInput";
import SubmitButton from "@/common/components/SubmitButton";
import { forgotPasswordSchema } from "@/common/schemas";
import { ForgotPasswordData, LoginData } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const { control, handleSubmit, reset, formState } =
    useForm<ForgotPasswordData>({
      resolver: zodResolver(forgotPasswordSchema),
      mode: "onSubmit",
    });
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<ForgotPasswordData> = async (data) => {
    try {
      const { message } = await forgotPassword(data);
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
      className="relative mx-auto flex max-w-sm flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-2xl font-semibold md:text-3xl lg:self-center lg:text-3xl">
        Recover your password
      </h2>
      <FormInput
        name="email"
        iconSrc="images/email.svg"
        control={control}
        placeholder="Email"
        type="email"
      />
      <SubmitButton isSubmitting={isSubmitting} title="Continue" />
      <p className="m-1 self-center text-base text-tertiary md:text-lg">
        Don't need to recover?
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
