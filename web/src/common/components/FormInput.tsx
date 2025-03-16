"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type InputProps = {
  title: string;
  type: "text" | "password" | "email" | "number";
  iconSrc: string;
  value: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
};

export default function FormInput({ title, type, iconSrc, value, setValue, isRequired = false }: InputProps) {
  const handleChangeValue = (targetValue: string) => {
    setValue(targetValue);
  };

  return (
    <motion.label
      htmlFor={title}
      className="my-2 flex h-11 w-full overflow-hidden rounded-full bg-input-gradient pl-6 shadow-custom-blue"
    >
      <Image src={iconSrc} alt={title} width="22" height="15" unoptimized />
      <input
        placeholder={title}
        id={title}
        type={type}
        aria-label={title}
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        required={isRequired}
        className="mx-2 w-full bg-transparent text-lg"
      />
    </motion.label>
  );
}
