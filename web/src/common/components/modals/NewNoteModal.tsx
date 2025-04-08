"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import FocusLock from "react-focus-lock";
import NewNoteForm from "@/common/components/forms/NewNoteForm";

export default function NewNoteModal() {
  const { isOpen, closeModal } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusLock>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed z-10 w-full h-full top-0 left-0 bg-secondary bg-opacity-10 flex items-end md:items-center justify-center"
          >
            <NewNoteForm />
          </motion.div>
        </FocusLock>
      )}
    </AnimatePresence>
  );
}
