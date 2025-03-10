"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type InputProps = {
  title: string;
  type: "text" | "password" | "email" | "number";
  iconSrc: string;
  value: string;
  setValue: (value: string) => void;
  isRequired?: boolean;
};

export default function FormInput({
  title,
  type,
  iconSrc,
  value,
  setValue,
  isRequired = false,
}: InputProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const handleChangeValue = (targetValue: string) => {
    setValue(targetValue);
    setIsError(false);
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsError(true);
  };

  return (
    <motion.label
      htmlFor={title}
      className="my-2 flex h-11 w-full overflow-hidden rounded-full bg-input-gradient pl-6 shadow-custom-blue"
      animate={{
        x: isError ? [-10, 10, -10, 10, -5, 5, 0] : 0,
        boxShadow: isError
          ? "0px 2px 0.9px 0px rgb(255, 0, 0)"
          : "0px 2px 0.9px 0px rgba(33, 30, 89, 0.29)",
      }}
      transition={{ duration: 0.3 }}
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
        onInvalid={handleInvalid}
        className="mx-2 w-full bg-transparent text-lg capitalize"
      />
    </motion.label>
  );
}
