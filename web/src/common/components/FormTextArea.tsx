"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";

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
