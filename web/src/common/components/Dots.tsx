"use client";
import Dot from "@/common/components/Dot";
import { useMouseTracker } from "../hooks/useMouseTracker";

export default function Dots() {
  const { isMouseOver, cursorPosition, onMouse } = useMouseTracker();
  const amount = 49;

  return (
    <div
      {...onMouse}
      className="grid h-full w-full grid-cols-7 grid-rows-7 place-items-center"
    >
      {[...Array(amount)].map((_, index) => (
        <Dot
          key={index}
          isMouseOver={isMouseOver}
          cursorPosition={cursorPosition}
        />
      ))}
    </div>
  );
}
