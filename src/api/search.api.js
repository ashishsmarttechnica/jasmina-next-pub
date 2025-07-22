import axios from "@/lib/axios";

export const getSearchSuggestions = async ({ query, limit = 10, page = 1, userId }) => {
  try {
    let url = `/search?query=${encodeURIComponent(query)}&limit=${limit}&page=${page}`;
    if (userId) {
      url += `&userId=${encodeURIComponent(userId)}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
