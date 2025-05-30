import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";

const useAuthStore = create(
  devtools(
    (set) => ({
      token: null,
      user: null,
      company: null,
      isAuthLoading: true,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setAuthLoading: (val) => set({ isAuthLoading: val }),
      logout: () => {
        Object.keys(Cookies.get()).forEach((cookieName) => {
          Cookies.remove(cookieName);
        });
        set({}, true);
        set({
          token: null,
          user: null,
          company: null,
          setToken: null,
          setUser: null,
        });
        // Clear other stores
        window.location.reload();
      },
    }),
    {
      name: "AuthStore",
    }
  )
);

export default useAuthStore;
