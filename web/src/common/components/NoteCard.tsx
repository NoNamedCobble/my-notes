"use client";
import { Note } from "@/common/types";
import { useModalStore } from "@/store/useModalStore";
import chroma from "chroma-js";
import { motion } from "framer-motion";

const getBestTextColor = (bgColor: string) => {
  const contrastWithBlack = chroma.contrast(bgColor, "black");
  const contrastWithWhite = chroma.contrast(bgColor, "white");

  return contrastWithBlack > contrastWithWhite ? "black" : "white";
};

export default function NoteCard({
  _id,
  title,
  content,
  background = "#ffffff",
}: Note) {
  const { openEditModal } = useModalStore();

  const handleClick = () => {
    openEditModal({ _id, title, content, background });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.15 }}
      onClick={handleClick}
      style={{
        backgroundColor: background,
        color: getBestTextColor(background),
      }}
      className="relative h-fit min-h-40 break-words rounded-lg p-3 shadow-custom-note"
    >
      <h2 className="text-2xl font-medium uppercase">{title}</h2>
      <p className="p-0.5">{content}</p>
    </motion.article>
  );
}
