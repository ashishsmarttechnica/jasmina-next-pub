import axios from "@/lib/axios";

export const createJob = async (data) => {
  const res = await axios.post("/create/job", data);
  return res.data;
};
export const getRecentJobs = async () => {
  const res = await axios.get("/recent/job");
  return res.data;
};
