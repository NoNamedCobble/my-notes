"use client";

import { ApiResponse, FormInputProps } from "@/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ZodSchema } from "zod";
import FormInput from "../FormInput";
import SubmitButton from "../SubmitButton";

interface GenericAuthFormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  title: string;
  submit: {
    action: (data: T) => Promise<ApiResponse>;
    redirectPath: string;
    buttonTitle: string;
  };
  inputs: Omit<FormInputProps, "control">[];
  auxiliaryLink?: {
    text: string;
    href: string;
  };
  footer?: {
    text: string;
    link: {
      href: string;
      text: string;
    };
  };
}
export default function GenericAuthForm<T extends FieldValues>({
  schema,
  title,
  inputs,
  submit,
  auxiliaryLink,
  footer,
}: GenericAuthFormProps<T>) {
  const router = useRouter();
  const { control, handleSubmit, reset, formState } = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });
  const { isSubmitting } = formState;

  const onSubmit: SubmitHandler<T> = async (data) => {
    try {
      const { message } = await submit.action(data);
      toast.success(message);
      router.push(submit.redirectPath);
    } catch (error: any) {
      const message = error.response.data.message;
      toast.error(message);
      reset();
    }
  };
  return (
    <form
      className="relative mx-auto flex max-w-md flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-2xl font-semibold md:mb-6 md:text-3xl lg:self-center lg:text-4xl">
        {title}
      </h2>

      {inputs.map((input) => (
        <FormInput key={input.name} {...input} control={control} />
      ))}

      {auxiliaryLink && (
        <Link
          href={auxiliaryLink.href}
          className="z-20 mb-2 block self-end text-base font-medium md:text-lg"
        >
          {auxiliaryLink.text}
        </Link>
      )}

      <SubmitButton isSubmitting={isSubmitting} title={submit.buttonTitle} />
      {footer && (
        <p className="m-1 self-center text-base text-tertiary md:text-lg">
          {footer.text}
          <Link
            href={footer.link.href}
            className="inline-block bg-custom-linkGradient bg-cover bg-center p-2 font-medium text-primary"
          >
            {footer.link.text}
          </Link>
        </p>
      )}
    </form>
  );
}
