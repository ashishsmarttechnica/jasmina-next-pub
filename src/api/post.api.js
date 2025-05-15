import axios from "@/lib/axios";

export const getAllPosts = async (page = 1, limit = 4) => {
  const res = await axios.get(`user/home/page?page=${page}&limit=${limit}`);
  return res.data;
};

export const getPostById = async (id) => {
  const res = await axios.get(`user/home/page?id=${id}`);
  return res.data;
};

export const createPost = async (data) => {
  const res = await axios.post("/create/post", data);
  return res.data;
};