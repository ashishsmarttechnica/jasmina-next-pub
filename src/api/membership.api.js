import axios from "@/lib/axios";

export const getAllMemberships = async () => {
  const res = await axios.get("/get/all/membership");
  return res.data;
};
