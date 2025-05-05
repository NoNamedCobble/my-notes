"use client";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";
import FormErrorMessage from "@/common/components/FormErrorMessage";

type FormInputProps = ComponentProps<"textarea"> & {
  control: Control<any>;
  name: string;
  iconSrc: string;
};

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
    <div className="relative w-3/5 px-2">
      <label htmlFor={name}>
        <textarea
          id={name}
          aria-label={name}
          disabled={isSubmitting}
          {...control.register(name)}
          {...props}
          className="h-52 w-full resize-none rounded-2xl bg-transparent bg-input-gradient p-3 pr-2 text-lg shadow-custom-blue"
        ></textarea>
      </label>
      <FormErrorMessage errors={errors} name={name} />
    </div>
  );
}
