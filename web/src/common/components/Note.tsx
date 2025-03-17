import { NoteProps } from "@/common/types";
import { motion } from "framer-motion";

export default function Note({ _id, title, content }: NoteProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.15 }}
      className="shadow-custom-note relative h-fit min-h-40 break-words rounded-lg bg-gradient-to-t from-[#907AAD] to-[#DABFFF] p-3"
    >
      <h2 className="text-2xl font-medium uppercase">{title}</h2>
      <p className="p-0.5">{content}</p>
    </motion.article>
  );
}
