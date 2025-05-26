import { useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { Position } from "../types";

const MAX_SIZE = 500;
const MIN_SIZE = 200;
const GRADIENTS = [
  { from: "#ec4899", to: "#8b5cf6" },
  { from: "#3b82f6", to: "#06b6d4" },
  { from: "#22c55e", to: "#84cc16" },
  { from: "#eab308", to: "#fb923c" },
  { from: "#ef4444", to: "#ec4899" },
];
const MAX_POSITION = 50;
const MIN_POSITION = -50;

const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * (MAX_POSITION - MIN_POSITION) + MIN_POSITION),
  y: Math.floor(Math.random() * (MAX_POSITION - MIN_POSITION) + MIN_POSITION),
});

const getRandomSize = () =>
  Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE);

const getRandomGradient = () =>
  GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)];

type BlobConfig = {
  initialPosition: Position;
  size: number;
  gradient: {
    from: string;
    to: string;
  };
};
export const useBlob = () => {
  const [config, setConfig] = useState<BlobConfig | null>(null);
  const [scope, animate] = useAnimate();

  useEffect(() => {
    setConfig({
      initialPosition: getRandomPosition(),
      size: getRandomSize(),
      gradient: getRandomGradient(),
    });
  }, [setConfig]);

  useEffect(() => {
    const animateBlob = async () => {
      while (scope.current) {
        const position = getRandomPosition();
        await animate(
          scope.current,
          {
            x: `${position.x}vw`,
            y: `${position.y}vh`,
          },
          {
            duration: 10,
            ease: "easeInOut",
          },
        );
      }
    };

    animateBlob();
  }, [config, animate, scope]);

  return { config, getRandomPosition, scope };
};
