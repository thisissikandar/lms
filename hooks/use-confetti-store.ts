import React from "react";
import { create } from "zustand";
import Confetti from "react-confetti";
import { on } from "events";

type ConfettiStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
export const useConfettiStore = create<ConfettiStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
