import axios from "@/lib/axios";

export const createJob = async (data) => {
  const res = await axios.post("/create/job", data);
  return res.data;
};
export const getRecentJobs = async () => {
  const res = await axios.get("/recent/job");
  return res.data;
};

export const getJobs = async ({ search = "", location = "", lgbtq, page = 1, limit = 10 } = {}) => {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (location) params.append("location", location);
  if (lgbtq === true || lgbtq === false) params.append("lgbtq", lgbtq);
  params.append("page", page);
  params.append("limit", limit);
  const res = await axios.get(`/search/job?${params.toString()}`);
  return res.data;
};

export const saveJob = async ({ jobId, userId }) => {
  const res = await axios.post("/save/job", { jobId, userId });
  return res.data;
};

export const getSavedJobs = async (userId) => {
  const res = await axios.get(`/get/save/job?id=${userId}`);
  return res.data;
};

export const getSavedJob = async (id) => {
  const res = await axios.get(`/get/save/job?id=${id}`);
  return res.data;
};
