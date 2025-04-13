import { create } from "zustand";
import { NoteProps } from "@/common/types";

interface ModalStore {
  isOpen: boolean;
  currentNote: NoteProps | null;
  openModal: () => void;
  openEditModal: (currentNote: NoteProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  currentNote: null,
  openModal: () => set({ isOpen: true }),
  openEditModal: (currentNote: NoteProps) => set({ isOpen: true, currentNote }),
  closeModal: () => set({ isOpen: false, currentNote: null }),
}));
