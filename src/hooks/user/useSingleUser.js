'use client';

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/auth.api";

export const useSingleUser = (userId) => {
  return useQuery({
    queryKey: ["singleUser", userId],
    queryFn: () => getUser(userId),
    select: (res) => res.data,
    enabled: !!userId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};