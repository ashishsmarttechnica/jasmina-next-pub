import { create } from "zustand";

const useNewJobPostStore = create((set) => ({
  meassage: "",
  isLoading: false,
  isverified: false,
  setMeassage: (meassage) => set({ meassage }),
  setLoading: (loading) => set({ isLoading: loading }),
  setIsverified: (isverified) => set({ isverified }),
}));

export default useNewJobPostStore;
