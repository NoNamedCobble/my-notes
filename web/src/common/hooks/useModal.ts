import { useState } from "react";

export const useModal = (defaultValue: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValue);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, openModal, closeModal };
};
