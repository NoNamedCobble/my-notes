"use client";
import NoteCardDropdown from "@/common/components/NoteCardDropdown";
import { useNotes } from "@/common/hooks/useNotes";
import { Note } from "@/common/types";
import { getBestColor } from "@/common/utils";
import { useModalStore } from "@/store/useModalStore";
import { motion } from "framer-motion";

export default function NoteCard({
  _id,
  title,
  content,
  background = "#ffffff",
}: Note) {
  const { openEditModal } = useModalStore();
  const { deleteNote } = useNotes();

  const options = [
    {
      label: "Edit",
      onClick: () => openEditModal({ _id, title, content, background }),
    },
    { label: "Delete", onClick: () => deleteNote(_id) },
  ];

  const bestColor = getBestColor(background);

  return (
    <motion.article
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.15 }}
      style={{
        backgroundColor: background,
        fill: bestColor,
        color: bestColor,
      }}
      className="relative min-h-40 break-words rounded-lg p-3 shadow-custom-note"
    >
      <NoteCardDropdown options={options} />
      <h2 className="text-2xl font-medium uppercase">{title}</h2>
      <p className="p-0.5">{content}</p>
    </motion.article>
  );
}
