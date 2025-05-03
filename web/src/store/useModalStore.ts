import { Note } from "@/common/types";
import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  currentNote: Note | null;
  openModal: () => void;
  openEditModal: (currentNote: Note) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  currentNote: null,
  openModal: () => set({ isOpen: true }),
  openEditModal: (currentNote: Note) => set({ isOpen: true, currentNote }),
  closeModal: () => set({ isOpen: false, currentNote: null }),
}));
