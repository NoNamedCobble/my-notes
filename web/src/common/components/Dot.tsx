"use client";
import { useDot } from "@/common/hooks/useDot";
import { Position } from "@/common/types";
import { motion } from "framer-motion";

type DotProps = {
  isMouseOver: boolean;
  cursorPosition: Position;
};
export default function Dot({ isMouseOver, cursorPosition }: DotProps) {
  const { dotRef, angle, dotLength, isRotationTransition } =
    useDot(cursorPosition);

  return (
    <motion.span
      ref={dotRef}
      className="block h-1 origin-center select-none rounded-full bg-primary lg:bg-secondary"
      animate={{
        width: isMouseOver ? dotLength : 4,
        rotate: angle,
      }}
      transition={{
        width: {
          duration: 0.1,
        },
        rotate: {
          duration: isRotationTransition ? 0.05 : 0,
        },
      }}
    />
  );
}
