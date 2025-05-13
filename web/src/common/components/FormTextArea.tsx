"use client";
import FormErrorMessage from "@/common/components/FormErrorMessage";
import { ComponentProps } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";

export interface FormTextAreaProps<T extends FieldValues>
  extends ComponentProps<"textarea"> {
  control: Control<T>;
  name: Path<T>;
}

export default function FormTextArea<T extends FieldValues>({
  control,
  name,
  ...props
}: FormTextAreaProps<T>) {
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
