import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <motion.div
      className="absolute m-auto h-6 w-6 origin-center rounded-full border-[3px] border-secondary border-l-transparent border-t-transparent"
      aria-hidden="true"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{
        rotate: {
          repeat: Infinity,
          duration: 0.6,
          ease: "linear",
        },
      }}
    ></motion.div>
  );
}
