"use client";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function useGoogleAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Function to handle Google sign-in with account type selection
  const handleGoogleSignIn = async (accountType) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // The signed-in user info
      const user = result.user;

      // Store the user data and account type in localStorage or your preferred state management
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          accountType: accountType,
        })
      );

      toast.success("Successfully logged in with Google!");

      // Redirect to dashboard or home page
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error(error.message || "Failed to sign in with Google");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleGoogleSignIn, isLoading };
}
