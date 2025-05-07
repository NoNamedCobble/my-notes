"use client";
import FormErrorMessage from "@/common/components/FormErrorMessage";
import { FormInputProps } from "@/common/types";
import Image from "next/image";
import { useController } from "react-hook-form";

export default function FormInput({
  control,
  name,
  iconSrc,
  ...props
}: FormInputProps) {
  const {
    formState: { errors, isSubmitting },
  } = useController({ control, name });
  return (
    <div>
      <label className="relative flex items-center" htmlFor={name}>
        <Image
          src={iconSrc}
          alt={name}
          width="22"
          height="15"
          className="absolute ml-6 h-6 w-6"
        />
        <input
          id={name}
          aria-label={name}
          disabled={isSubmitting}
          {...control.register(name)}
          {...props}
          className="mx-2 h-11 w-full rounded-full bg-transparent bg-input-gradient pl-11 pr-2 text-lg shadow-custom-blue"
        />
      </label>
      <FormErrorMessage errors={errors} name={name} />
    </div>
  );
}
