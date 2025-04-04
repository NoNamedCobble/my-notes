import { create } from "zustand";

interface PopupStore {
  isOpen: boolean;
  message: string;
  openPopup: (message: string) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupStore>((set) => ({
  isOpen: false,
  message: "",
  openPopup: (message) => set({ isOpen: true, message }),
  closePopup: () => set({ isOpen: false }),
}));
