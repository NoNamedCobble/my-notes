"use client";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";

export default function NoteCardSkeleton() {
  return (
    <motion.article
      initial={{ opacity: 0, y: "-10%" }}
      animate={{ opacity: 1, y: "0" }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.15 }}
      className="relative min-h-40 rounded-lg bg-gray-700 p-3 shadow-custom-note"
    >
      <div className="absolute right-2 top-2 mr-1">
        <Skeleton width={30} height={30} style={{ borderRadius: "5px" }} />
      </div>
      <div className="mb-4">
        <Skeleton width="50%" height={24} />
      </div>

      <div className="flex flex-col gap-1">
        <Skeleton height={20} />
        <Skeleton height={20} width="85%" />
        <Skeleton height={20} width="65%" />
      </div>
    </motion.article>
  );
}
