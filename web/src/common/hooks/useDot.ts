import { Position } from "@/common/types";
import { useMemo, useRef } from "react";

const MULTIPLIER = 12;
const MAX_DOT_LENGTH = 20;
const MIN_DOT_LENGTH = 4;

export const useDot = (cursorPosition: Position) => {
  const dotRef = useRef<HTMLSpanElement | null>(null);
  const prevAngleRef = useRef(0);

  const calculateDotProperties = useMemo(() => {
    if (!dotRef.current) {
      return {
        angle: 0,
        dotLength: MIN_DOT_LENGTH,
        isRotationTransition: true,
      };
    }

    const { x, y, width, height } = dotRef.current.getBoundingClientRect();
    const dotCenterX = x + width / 2;
    const dotCenterY = y + height / 2;

    const cursorAngle =
      Math.atan2(cursorPosition.y - dotCenterY, cursorPosition.x - dotCenterX) *
      (180 / Math.PI);

    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - dotCenterX, 2) +
        Math.pow(cursorPosition.y - dotCenterY, 2)
    );

    const dotLength = Math.min(
      Math.max(MAX_DOT_LENGTH - distance / MULTIPLIER, MIN_DOT_LENGTH),
      30
    );

    const delta = cursorAngle - prevAngleRef.current;
    const isRotationTransition = Math.abs(delta) <= 180;
    prevAngleRef.current = cursorAngle;

    return { angle: cursorAngle, dotLength, isRotationTransition };
  }, [cursorPosition]);

  return {
    dotRef,
    ...calculateDotProperties,
  };
};

export default useDot;
