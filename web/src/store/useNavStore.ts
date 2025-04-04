import { create } from "zustand";

interface NavStore {
  isNavOpen: boolean;
  toggleNav: () => void;
}

export const useNavStore = create<NavStore>((set) => ({
  isNavOpen: false,
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen })),
}));
