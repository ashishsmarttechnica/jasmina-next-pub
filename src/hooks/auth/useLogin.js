import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/api/auth.api";
import useAuthStore from "@/store/auth.store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/navigation";

export default function useLogin() {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success === true) {
        const token = data.data.token;
        const role = data.data.role;
        const profileComplete = data.data.profileComplete;

        // Set cookies for middleware
        Cookies.set("token", token);
        Cookies.set("userRole", role);
        Cookies.set("isAuthenticated", "true");
        Cookies.set("profileCreated", profileComplete);
        Cookies.set("userId", data.data._id);


        // Zustand update
        setToken(token);
        setUser(data.data);

        toast.success("Login successful!");

        // Role-based redirection using router.push
        if (role === "user") {
          router.push("/feed");
        } else if (role === "company") {
          router.push("/company/feed");
        } else {
          router.push("/");
        }
      } else {
        toast.error(
          `Login failed: ${data?.message || "Something went wrong!"}`
        );
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(
        `An error occurred: ${
          error?.response?.data?.message || "Something went wrong!"
        }`
      );
    },
  });
}
