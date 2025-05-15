import axios from "@/lib/axios";

export const getAllPosts = async (page = 1) => {
  const res = await axios.get(`user/home/page?page=${page}`);
  return res.data;
};

export const getPostById = async (id) => {
  const res = await axios.get(`user/home/page?id=${id}`);
  return res.data;
};
