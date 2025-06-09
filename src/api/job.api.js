import axios from "@/lib/axios";

export const createJob = async (data) => {
  const res = await axios.post("/create/job", data);
  return res.data;
};
