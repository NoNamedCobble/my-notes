"use client";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type WarningPopupProps = {
  message: string;
  isOpen: boolean;
};

export default function WarningPopup({ message, isOpen }: WarningPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-20%", x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: "20%", x: "-50%" }}
          transition={{
            opacity: { duration: 0.2 },
            y: { duration: 0.15 },
          }}
          role="alert"
          aria-live="assertive"
          className="fixed left-1/2 top-10 z-10 flex w-fit -translate-x-1/2 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          <Image
            src="images/warning.svg"
            alt="Warning"
            width={40}
            height={40}
          />
          <p className="whitespace-nowrap text-xl">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
