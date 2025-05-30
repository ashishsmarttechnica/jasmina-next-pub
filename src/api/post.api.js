import axios from "@/lib/axios";
import Cookies from "js-cookie";
export const getAllPosts = async (page = 1, limit = 4) => {
  const res = await axios.get(
    `user/home/page?page=${page}&limit=${limit}&id=${Cookies.get("userId")}`
  );
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

export const likePost = async (id) => {
  const res = await axios.post(`/create/like`, {
    postId: id,
    userId: Cookies.get("userId"),
  });
  return res.data;
};

export const unlikePost = async (id) => {
  const res = await axios.post(`/remove/like`, {
    postId: id,
    userId: Cookies.get("userId"),
  });
  return res.data;
};

// export const SinglePost = async (id) => {
//   const res = await axios.get(`/get/single/post?id=${id}`, {
//     postId: id,
//     userId: Cookies.get("postId"),
//   });
// };
export const SinglePostById = async (id) => {
  const res = await axios.get(`/get/single/post`, {
    params: { id },
  });
  return res.data;
};
