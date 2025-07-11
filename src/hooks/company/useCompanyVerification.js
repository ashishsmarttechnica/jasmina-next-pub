import { checkCompanyVerification } from "@/api/company.api";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCompanyVerification = () => {
  const companyId = Cookies.get("userId");

  return useQuery({
    queryKey: ["companyVerification", companyId],
    queryFn: () => checkCompanyVerification(companyId),
    enabled: !!companyId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useCompanyVerification;
