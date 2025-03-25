import LoadingSpinner from "@/common/components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";

type SubmitButtonProps = {
  title: string;
  isSubmitting: boolean;
};

export default function SubmitButton({
  isSubmitting,
  title,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="flex h-12 w-fit min-w-36 items-center justify-center self-center rounded-full bg-primary text-xl text-secondary duration-200 hover:scale-105 hover:bg-quaternary active:translate-y-0.5 disabled:pointer-events-none md:text-2xl"
    >
      <AnimatePresence>
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
