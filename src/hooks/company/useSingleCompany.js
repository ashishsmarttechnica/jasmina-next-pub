"use client";

import { getCompany } from "@/api/company.api";
import { useQuery } from "@tanstack/react-query";

export const useSingleCompany = (userId) => {
  return useQuery({
    queryKey: ["singleCompany", userId],
    queryFn: () => getCompany(userId),
    select: (res) => res.data,
    enabled: !!userId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
