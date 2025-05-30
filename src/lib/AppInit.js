"use client";
import { useRouter } from "@/i18n/navigation";
import axiosInstance from "@/lib/axios";
import useAuthStore from "@/store/auth.store";
import Cookies from "js-cookie";
import { useEffect } from "react";

const AppInit = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const setAuthLoading = useAuthStore((state) => state.setAuthLoading);
  useEffect(() => {
    const initApp = async () => {
      const token = Cookies.get("token");
      setAuthLoading(true);
      if (token) {
        try {
          // Call refresh token API
          const response = await axiosInstance.post("/refresh/token", {
            token,
          });

          // Check if response is successful
          if (response.data.success) {
            const newToken = response.data.data.token;
            const user = response.data.data;

            // Save new token & user in cookies and state
            Cookies.set("token", newToken);

            setToken(newToken);
            setUser(user);
          } else {
            // If response is not successful, force logout
            logout();
            router.push("/login");
          }
        } catch (error) {
          console.error("Failed to refresh token", error);
          // Handle logout and redirection on failure
          logout();
          router.push("/login");
        }
      }
      setAuthLoading(false);
    };

    initApp();
  }, [setToken, setUser, router, logout, setAuthLoading]);

  return null; // No UI is rendered here
};

export default AppInit;
