"use client";
import { NoteProps } from "@/common/types";
import { motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import chroma from "chroma-js";

const getBestTextColor = (bgColor: string) => {
  const contrastWithBlack = chroma.contrast(bgColor, "black");
  const contrastWithWhite = chroma.contrast(bgColor, "white");

  return contrastWithBlack > contrastWithWhite ? "black" : "white";
};

export default function Note({
  _id,
  title,
  content,
  background = "#ffffff",
}: NoteProps) {
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
      className="shadow-custom-note relative h-fit min-h-40 break-words rounded-lg p-3"
    >
      <h2 className="text-2xl font-medium uppercase">{title}</h2>
      <p className="p-0.5">{content}</p>
    </motion.article>
  );
}
