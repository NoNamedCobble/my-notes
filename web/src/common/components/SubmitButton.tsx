import LoadingSpinner from "@/common/components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import { ComponentProps } from "react";

type SubmitButtonProps = ComponentProps<"button"> & {
  title: string;
  isSubmitting: boolean;
};

export default function SubmitButton({
  isSubmitting,
  title,
  ...props
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="m-2 flex h-12 w-fit min-w-36 items-center justify-center self-center rounded-full bg-primary px-4 text-xl text-secondary duration-200 hover:scale-105 hover:bg-quaternary active:translate-y-0.5 disabled:pointer-events-none md:text-2xl"
      {...props}
    >
      <AnimatePresence initial={false}>
        {isSubmitting ? (
          <LoadingSpinner />
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
