"use client";
import Dot from "@/common/components/Dot";
import { useCallback, useState } from "react";
import { Position } from "@/common/types";

import { DotsProps } from "@/common/types";

export default function Dots({
  maxDotLength,
  minDotLength,
  multiplier,
  amount,
}: DotsProps) {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const handleMouseEnter = () => {
    setIsMouseOver(true);
  };

  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = event;
      const x = clientX;
      const y = clientY;

      setCursorPosition({ x, y });
    },
    [],
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="grid h-full w-full grid-cols-7 grid-rows-7 place-items-center"
    >
      {[...Array(amount)].map((_, index) => (
        <Dot
          key={index}
          isMouseOver={isMouseOver}
          maxDotLength={maxDotLength}
          minDotLength={minDotLength}
          multiplier={multiplier}
          cursorPosition={cursorPosition}
        />
      ))}
    </div>
  );
}
