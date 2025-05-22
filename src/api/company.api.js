import axios from "@/lib/axios";

export const updateCompanyProfile = async ({ data, userId }) => {
  const res = await axios.put(`/update/company/?id=${userId}`, data);
  return res.data;
};

// export const getAllCompanyPosts = async (page = 1, limit = 4) => {
//   const res = await axios.get(`user/home/page?page=${page}&limit=${limit}`);
//   return res.data;
// };

// export const getPostCompanyById = async (id) => {
//   const res = await axios.get(`user/home/page?id=${id}`);
//   return res.data;
// };

// export const createCompanyPost = async (data) => {
//   const res = await axios.post("/create/post", data);
//   return res.data;
// };