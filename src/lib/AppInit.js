"use client";
import React, { useEffect } from "react";
import axiosInstance from "../lib/axios";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";

const AppInit = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    const initApp = async () => {
      const token = Cookies.get("token");

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
      } else {
        // If no token found, force logout and redirect to login
        logout();
        router.push("/login");
      }
    };

    initApp();
  }, [setToken, setUser, router, logout]);

  return null; // No UI is rendered here
};

export default AppInit;
