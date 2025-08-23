"use client";
import { useRouter } from "@/i18n/navigation";
import axios from "@/lib/axios";
import { auth, googleProvider } from "@/lib/firebase";
import useAuthStore from "@/store/auth.store";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const t = useTranslations("Auth");

  // Function to handle Google sign-in with account type selection
  const handleGoogleSignIn = async (accountType) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // The signed-in user info
      const user = result.user;

      try {
        // Send user data to backend API using axios instance
        const response = await axios.post("/google", {
          googleId: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          entity: accountType,
        });

        // Handle response from API
        if (response.data.success) {
          const userData = response.data.data;
          const token = userData.token;
          const role = userData.role;
          const profileComplete = userData.profileComplete;

          // Set cookies for middleware
          Cookies.set("token", token);
          Cookies.set("userRole", role);
          Cookies.set("isAuthenticated", "true");
          Cookies.set("profileCreated", profileComplete);
          Cookies.set("userId", userData._id);

          // Update Zustand store
          setToken(token);
          setUser(userData);

          toast.success(t("GoogleSignInSuccess"));

          // Redirect based on role
          if (role === "user") {
            router.push("/feed");
          } else if (role === "company") {
            router.push("/company/feed");
          } else {
            router.push("/dashboard");
          }
        } else {
          toast.error(response.data.message || t("GoogleSignInFailed"));
        }
      } catch (apiError) {
        console.error("Error during Google registration with backend:", apiError);
        toast.error(apiError?.response?.data?.message || "Failed to register with Google");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleSignIn, isLoading };
}
