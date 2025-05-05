import { AnimatePresence, motion } from "framer-motion";
import { FieldErrors } from "react-hook-form";

type FormErrorMessageProps = {
  errors: FieldErrors | undefined;
  name: string;
};
export default function FormErrorMessage({
  errors,
  name,
}: FormErrorMessageProps) {
  const error = errors?.[name];
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="ml-10 mt-1 text-red-700"
          role="alert"
          aria-live="assertive"
        >
          {error?.message?.toString()}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
