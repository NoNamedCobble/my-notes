"use client";
import { motion } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css";
import StyledSkeleton from "./StyledSkeleton";

export default function NoteCardSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.15 }}
      className="relative min-h-40 rounded-lg p-3 shadow-custom-note bg-gray-700"
    >
      <div className="absolute top-2 right-2 mr-1">
        <StyledSkeleton
          width={30}
          height={30}
          style={{ borderRadius: "5px" }}
        />
      </div>
      <div className="mb-4">
        <StyledSkeleton width="50%" height={24} />
      </div>

      <div className="flex flex-col gap-1">
        <StyledSkeleton height={20} />
        <StyledSkeleton height={20} width="85%" />
        <StyledSkeleton height={20} width="65%" />
      </div>
    </motion.article>
  );
}
