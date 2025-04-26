import { useState } from "react";

export const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const close = () => {
    setIsOpen(false);
  };

  return { isOpen, toggle, close };
};
