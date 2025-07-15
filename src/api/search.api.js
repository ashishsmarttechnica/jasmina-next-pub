import axios from "@/lib/axios";

export const getSearchSuggestions = async ({ query, limit = 10, page = 1 }) => {
  try {
    const response = await axios.get(
      `/search?query=${encodeURIComponent(query)}&limit=${limit}&page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
