"use client";
import { motion } from "framer-motion";
import FocusLock from "react-focus-lock";

type NavigationButtonProps = {
  isNavOpen: boolean;
  toggleNav: () => void;
};

export default function NavigationButton({
  isNavOpen,
  toggleNav,
}: NavigationButtonProps) {
  const burgerSpanTransition = {
    y: { delay: isNavOpen ? 0 : 0.1, duration: 0.1 },
    rotate: { delay: isNavOpen ? 0.1 : 0, duration: 0.1 },
  };

  return (
    <FocusLock group="navigation" disabled={!isNavOpen}>
      <button
        onClick={toggleNav}
        aria-controls="navigation"
        aria-expanded={isNavOpen}
        aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        className="relative flex h-16 w-16 flex-col items-center justify-center gap-2 justify-self-end rounded-full duration-75 hover:bg-secondary hover:bg-opacity-10"
      >
        <motion.span
          className="block h-1 w-4/6 origin-center rounded-full bg-secondary"
          animate={{
            rotate: isNavOpen ? 45 : 0,
            y: isNavOpen ? "150%" : "0",
          }}
          transition={burgerSpanTransition}
        ></motion.span>
        <motion.span
          className="block h-1 w-4/6 origin-center rounded-full bg-secondary"
          animate={{
            rotate: isNavOpen ? -45 : 0,
            y: isNavOpen ? "-150%" : "0",
          }}
          transition={burgerSpanTransition}
        ></motion.span>
      </button>
    </FocusLock>
  );
}
