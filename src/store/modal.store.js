"use client";
import { create } from "zustand";

const useModalStore = create((set) => ({
    isBlockedModalOpen: false,
    openBlockedModal: () => set({ isBlockedModalOpen: true }),
    closeBlockedModal: () => set({ isBlockedModalOpen: false }),
}));

export default useModalStore;
