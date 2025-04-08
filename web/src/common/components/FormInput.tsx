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
      <AnimatePresence>
        {errors[name] && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="ml-10 mt-1 text-red-700"
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
