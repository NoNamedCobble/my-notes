import { useState } from "react";

export const useTimeoutPopup = (timeout: number = 5000) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, timeout);
  };

  return { isPopupOpen, openPopup };
};
