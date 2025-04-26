"use client";
import { useOutsideClick } from "@/common/hooks/useOutsideClick";
import { useToggle } from "@/common/hooks/useToggle";
import { AnimatePresence, motion } from "framer-motion";

type NoteCardDropdownProps = {
  options: {
    label: string;
    onClick: () => void;
  }[];
};

export default function NoteCardDropdown({ options }: NoteCardDropdownProps) {
  const { isOpen, toggle, close } = useToggle();
  const ref = useOutsideClick<HTMLUListElement>(close);

  return (
    <div className="relative float-right h-10 w-10">
      <button
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="h-full w-full rounded-md bg-secondary bg-opacity-0 p-2 duration-75 hover:bg-opacity-20"
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d="M8,6.5A1.5,1.5,0,1,0,9.5,8,1.5,1.5,0,0,0,8,6.5Zm5,0A1.5,1.5,0,1,0,14.47,8,1.5,1.5,0,0,0,13,6.5ZM3,6.5A1.5,1.5,0,1,0,4.53,8,1.5,1.5,0,0,0,3,6.5Z" />
          </g>
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            onClick={close}
            ref={ref}
            initial={{ opacity: 0, y: "-10%" }}
            animate={{ opacity: 1, y: "0" }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.05 }}
            className="absolute right-0 top-full min-w-20 overflow-hidden rounded-md bg-primary text-left text-xl font-normal text-secondary shadow-custom-blue"
          >
            {options.map(({ label, onClick }) => (
              <li
                key={label}
                className="bg-white bg-opacity-0 duration-75 hover:bg-opacity-20"
              >
                <button className="w-full" onClick={onClick}>
                  {label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
