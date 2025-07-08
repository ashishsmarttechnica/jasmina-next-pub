"use client";
import GoogleIcon from "@/assets/form/GoogleIcon.png";
import { useRouter } from "@/i18n/navigation";
import axios from "@/lib/axios";
import { auth, googleProvider } from "@/lib/firebase";
import useAuthStore from "@/store/auth.store";
import { signInWithPopup } from "firebase/auth";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // The signed-in user info
      const user = result.user;

      try {
        // Send user data to backend API for login verification
        const response = await axios.post("/google", {
          googleId: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          // accountType: "User", // Default to "User" for login
          isLogin: true, // Flag to indicate this is a login request
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

          toast.success(t("LoginSuccess"));

          // Redirect based on role
          if (role === "user") {
            router.push("/feed");
          } else if (role === "company") {
            router.push("/company/feed");
          } else {
            router.push("/dashboard");
          }
        } else {
          toast.error(response.data.message || t("LoginFailed"));
        }
      } catch (apiError) {
        console.error(t("apierror"), apiError);
        toast.error(apiError?.response?.data?.message || t("LoginFailed"));
      }
    } catch (error) {
      console.error(t("errorsignin"), error);
      toast.error(error.message || t("LoginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-gray mx-auto flex max-w-65.5 cursor-pointer items-center justify-center rounded-md py-[13px]"
      onClick={handleGoogleLogin}
    >
      <Image
        src={GoogleIcon}
        alt={t("GoogleIconAltImg")}
        width={24}
        height={24}
        className="mr-2 h-6 w-6"
      />
      <span>{t("ContinueWithGoogle")}</span>
    </div>
  );
};

export default GoogleLoginButton;
