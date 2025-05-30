import { create } from "zustand";

const useLocationStore = create((set) => ({
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",

  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setSelectedState: (state) => set({ selectedState: state }),
  setSelectedCity: (city) => set({ selectedCity: city }),

  resetLocation: () =>
    set({
      selectedCountry: "",
      selectedState: "",
      selectedCity: "",
    }),
}));

export default useLocationStore;
