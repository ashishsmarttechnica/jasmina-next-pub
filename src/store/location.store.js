import { create } from "zustand";

const useLocationStore = create((set) => ({
  location: "",
  city: "",
  stateDistrict: "",
  state: "",
  country: "",
  setLocation: (fullLocation) => set({ location: fullLocation }),
  setCity: (city) => set({ city }),
  setStateDistrict: (stateDistrict) => set({ stateDistrict }),
  setState: (state) => set({ state }),
  setCountry: (country) => set({ country }),
}));

export default useLocationStore;
