"use client";
import NoteForm from "@/common/components/forms/NoteForm";
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from "@/common/hooks/useNotesHooks";
import { NoteWithoutId } from "@/common/types";
import { useNoteModalStore } from "@/store/useNoteModalStore";
import { AnimatePresence, motion } from "framer-motion";
import FocusLock from "react-focus-lock";

export default function NoteModal() {
  const { isOpen, currentNote, closeModal } = useNoteModalStore();
  const updateNoteMutation = useUpdateNoteMutation();
  const createNoteMutation = useCreateNoteMutation();

  const labels = {
    heading: currentNote ? "Edit your note" : "Create new note",
    submit: currentNote ? "Save changes" : "Create",
  };

  const mutate = (data: NoteWithoutId) =>
    currentNote
      ? updateNoteMutation.mutate({ _id: currentNote._id, ...data })
      : createNoteMutation.mutate(data);

  return (
    <AnimatePresence>
      {isOpen && (
        <FocusLock>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed left-0 top-0 z-10 flex h-full w-full items-end justify-center bg-black bg-opacity-30 md:items-center"
          >
            <NoteForm
              currentNote={currentNote}
              closeModal={closeModal}
              labels={labels}
              mutate={mutate}
            />
          </motion.div>
        </FocusLock>
      )}
    </AnimatePresence>
  );
}
