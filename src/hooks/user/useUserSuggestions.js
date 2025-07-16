import { getUserSuggestions } from "@/api/user.api";
import useUserMightKnowStore from "@/store/userMightKnow.store";
import { useQuery } from "@tanstack/react-query";

export const useUserSuggestions = (page = 1) => {
  const { suggestions, setSuggestions } = useUserMightKnowStore();

  return useQuery({
    queryKey: ["userSuggestions", page],
    queryFn: async () => {
      try {
        const params = { page };
        const response = await getUserSuggestions(params);
        if (response?.success) {
          // Merge new suggestions with existing ones if not first page
          const newSuggestions =
            page === 1
              ? response.data
              : {
                  ...response.data,
                  results: [...(suggestions?.results || []), ...response.data.results],
                };
          setSuggestions(newSuggestions);
          return newSuggestions;
        }
        throw new Error(response?.message || "Failed to fetch suggestions");
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        throw error;
      }
    },
    enabled: !suggestions?.results?.length || page > 1,
    refetchOnWindowFocus: false,
    retry: 1,
    // staleTime: 5 * 60 * 1000,
    // cacheTime: 10 * 60 * 1000,
  });
};
