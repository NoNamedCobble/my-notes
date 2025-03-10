"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Position } from "@/common/types";

import { DotsProps } from "@/common/types";

type DotProps = Omit<DotsProps, "amount"> & {
  isMouseOver: boolean;
  cursorPosition: Position;
};

export default function Dot({
  isMouseOver,
  cursorPosition,
  maxDotLength,
  minDotLength,
  multiplier,
}: DotProps) {
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const [angle, setAngle] = useState(0);
  const [dotLength, setDotLength] = useState(maxDotLength);
  const [isRotationTrasition, setRotationTransition] = useState(true);

  useEffect(() => {
    if (!cursorPosition || !dotRef.current) return;

    const { x, y, width, height } = dotRef.current.getBoundingClientRect();

    const dotCenterX = x + width / 2;
    const dotCenterY = y + height / 2;

    const cursorAngle =
      Math.atan2(cursorPosition.y - dotCenterY, cursorPosition.x - dotCenterX) *
      (180 / Math.PI);

    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - dotCenterX, 2) +
        Math.pow(cursorPosition.y - dotCenterY, 2),
    );
    const newDotLength = Math.min(
      Math.max(maxDotLength - distance / multiplier, minDotLength),
      30,
    );
    setDotLength(newDotLength);

    setAngle((prevAngle) => {
      setRotationTransition(true);
      const delta = cursorAngle - prevAngle;

      if (delta > 180 || delta < -180) {
        setRotationTransition(false);
      }

      return cursorAngle;
    });
  }, [cursorPosition]);

  return (
    <motion.span
      ref={dotRef}
      className="block h-1 origin-center select-none rounded-full bg-primary lg:bg-secondary"
      style={{ willChange: "transform, opacity" }}
      animate={{
        width: isMouseOver ? dotLength : 4,
        rotate: angle,
      }}
      transition={{
        width: {
          duration: 0.1,
        },
        rotate: {
          duration: isRotationTrasition ? 0.05 : 0,
        },
      }}
    />
  );
}
