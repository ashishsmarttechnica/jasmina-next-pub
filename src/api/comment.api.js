import axios from "@/lib/axios";

export const getAllComments = async (postId, page, limit = 10) => {
  const res = await axios.get(
    `/get/comments?postId=${postId}&page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createComment = async (data) => {
  const res = await axios.post("/create/comment", data);
  return res.data;
};
