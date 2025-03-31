"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";

type FormInputProps = ComponentProps<"input"> & {
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
    <div>
      <label
        htmlFor={name}
        className="flex h-11 w-full rounded-full bg-input-gradient px-6 shadow-custom-blue"
      >
        <Image
          src={iconSrc}
          alt={name}
          width="22"
          height="15"
          className="w-6"
        />
        <input
          id={name}
          aria-label={name}
          disabled={isSubmitting}
          {...control.register(name)}
          {...props}
          className="mx-2 h-full w-full bg-transparent text-lg"
        />
      </label>
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mt-1 ml-10 text-red-700"
            role="alert"
            aria-live="assertive"
          >
            {errors[name].message?.toString()}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
