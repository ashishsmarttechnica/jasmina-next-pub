import { checkCompanyVerification } from "@/api/company.api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import useNewJobPostStore from "../../store/newjobpost.store";

export const useCompanyVerification = () => {
  const companyId = Cookies.get("userId");
  const setMeassage = useNewJobPostStore((s) => s.setMeassage);
  const setIsverified = useNewJobPostStore((s) => s.setIsverified);

  return useQuery({
    queryKey: ["companyVerification", companyId],
    queryFn: async () => {
      try {
        const res = await checkCompanyVerification(companyId);
        if (res.success) {
          setIsverified(true);
          setMeassage(""); // Clear any previous error messages
        } else {
          setIsverified(false);
          setMeassage(res.message || "Verification failed");
        }
        return res.data;
      } catch (error) {
        setIsverified(false);
        setMeassage(error.response?.data?.message || "Something went wrong");
        console.error("Error fetching company verification:", error);
        throw error;
      }
    },
    enabled: !!companyId,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes - data is considered fresh for 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes - cache data for 10 minutes
  });
};

export default useCompanyVerification;
