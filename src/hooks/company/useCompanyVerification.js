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
        }
        return res.data;
      } catch (error) {
        setMeassage(error.response?.data?.message || "Something went wrong");
        console.error("Error fetching company verification:", error);
        throw error;
      }
    },
    enabled: !!companyId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useCompanyVerification;
