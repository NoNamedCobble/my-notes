import { Position } from "@/common/types";
import { useCallback, useState } from "react";

export const useMouseTracker = () => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const onMouseEnter = () => {
    setIsMouseOver(true);
  };

  const onMouseLeave = () => {
    setIsMouseOver(false);
  };

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    const x = clientX;
    const y = clientY;

    setCursorPosition({ x, y });
  }, []);

  return {
    isMouseOver,
    cursorPosition,
    onMouse: { onMouseEnter, onMouseLeave, onMouseMove },
  };
};
