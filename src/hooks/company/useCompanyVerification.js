import { checkCompanyVerification } from "@/api/company.api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import useNewJobPostStore from "../../store/newjobpost.store";

export const useCompanyVerification = () => {
  const companyId = Cookies.get("userId");
  const setMessage = useNewJobPostStore((s) => s.setMessage);
  const setIsverified = useNewJobPostStore((s) => s.setIsverified);

  return useQuery({
    queryKey: ["companyVerification", companyId],
    queryFn: async () => {
      try {
        const res = await checkCompanyVerification(companyId);
        if (res.success) {
          setIsverified(true);
          setMessage(""); // Clear any previous error messages
        } else {
          setIsverified(false);
          setMessage(res.message || "Verification failed");
        }
        return res.data;
      } catch (error) {
        setIsverified(false);
        setMessage(error.response?.data?.message || "Something went wrong");
        console.error("Error fetching company verification:", error);
        throw error;
      }
    },
    enabled: !!companyId,
    retry: 1,
    refetchOnWindowFocus: true, // Changed to true to check on window focus
    refetchOnMount: true, // Always refetch when component mounts
    staleTime: 0, // Changed to 0 to always consider data stale and refetch
    cacheTime: 5 * 60 * 1000, // 5 minutes - cache data for 5 minutes
  });
};

export default useCompanyVerification;
