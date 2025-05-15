import axios from "@/lib/axios";

export const updateCompanyProfile = async ({ data, userId }) => {
  const res = await axios.put(`/update/company/?id=${userId}`, data);
  return res.data;
};