"use client";
import NoteForm from "@/common/components/forms/NoteForm";
import { useModalStore } from "@/store/useModalStore";
import { AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";

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
            className="fixed left-0 top-0 z-10 flex h-full w-full items-end justify-center bg-black bg-opacity-30 md:items-center"
          >
            <NoteForm />
          </motion.div>
        </FocusLock>
      )}
    </AnimatePresence>
  );
}
