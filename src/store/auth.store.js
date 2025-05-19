import { create } from "zustand";
import { devtools } from "zustand/middleware";
import Cookies from "js-cookie";

const useAuthStore = create(
  devtools(
    (set) => ({
      token: null,
      user: null,
      company: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setCompany: (company) => set({ company }),
      logout: () => {
        // Clear cookies
        Cookies.remove("token");
        Cookies.remove("userRole");
        Cookies.remove("isAuthenticated");
        Cookies.remove("userId");
        Cookies.remove("profileCreated");
        // Clear state
        set({ token: null, user: null, company: null });
      },
    }),
    {
      name: "AuthStore",
    }
  )
);

export default useAuthStore;
