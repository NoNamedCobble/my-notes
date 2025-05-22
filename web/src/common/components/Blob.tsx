"use client";
import { motion } from "framer-motion";
import { useBlob } from "../hooks/useBlob";

export default function Blob() {
  const { config, scope } = useBlob();

  if (!config) return null;
  return (
    <motion.div
      initial={{
        x: `${config.initialPosition.x}vw`,
        y: `${config.initialPosition.y}vh`,
        opacity: 0,
      }}
      animate={{
        opacity: 0.3,
      }}
      ref={scope}
      className="opacity-1 absolute origin-center rounded-full mix-blend-multiply blur-2xl"
      style={{
        backgroundImage: `linear-gradient(to bottom right, ${config.gradient.from}, ${config.gradient.to})`,
        width: config.size,
        height: config.size,
      }}
    />
  );
}
