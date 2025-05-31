"use client";

import { getUser } from "@/api/auth.api";
import useSingleUserStore from "@/store/singleUser.store";
import { useQuery } from "@tanstack/react-query";

export const useSingleUser = (userId) => {
  const { setUserData, setLoading, setError } = useSingleUserStore();

  return useQuery({
    queryKey: ["singleUser", userId],
    queryFn: async () => {
      try {
        const res = await getUser(userId);
        if (res?.success) {
          setUserData(res.data);
          return res.data;
        }
        throw new Error(res?.message || "Failed to fetch user data");
      } catch (error) {
        setError(error?.response?.data?.message || error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    enabled: !!userId,
    retry: 1,
    refetchOnWindowFocus: false,
  });
};
