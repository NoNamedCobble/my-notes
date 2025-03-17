import { useState } from "react";

export const useTimeoutPopup = (timeout: number = 5000) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const openPopup = (message: string = "Something went wrong.") => {
    setIsPopupOpen(true);
    setPopupMessage(message);
    setTimeout(() => {
      setIsPopupOpen(false);
    }, timeout);
  };

  return { isPopupOpen, openPopup, popupMessage };
};
