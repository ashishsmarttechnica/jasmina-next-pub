// hooks/useVerifyOtp.js
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/api/auth.api";
import { toast } from "react-toastify";
import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";
import Cookies from "js-cookie";

export default function useVerifyOtp() {
  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {
      if (data?.success === true) {
        const token = data.data.token;
        const role = data.data.role;
        const profileComplete = data.data.profileComplete;

        toast.success(data.message || "OTP verified successfully!");

        // Set cookies for middleware
        Cookies.set("token", token);
        Cookies.set("userRole", role);
        Cookies.set("isAuthenticated", "true");
        Cookies.set("profileCreated", profileComplete);
        Cookies.set("userId", data.data._id);
        setToken(token);
        setUser(data.data);

        if (role === "user") {
          router.push("/user/create-profile");
        } else if (role === "company") {
          router.push("/company/create-profile");
        }
      } else {
        toast.error(data?.message || "OTP verification failed!");
      }
    },
    onError: (error) => {
      const errorMessage =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(`Error: ${errorMessage}`);
    },
  });
}
