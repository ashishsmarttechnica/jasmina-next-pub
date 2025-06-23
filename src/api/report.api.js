import axios from "@/lib/axios";

export const createReport = async (data) => {
  const res = await axios.post("/create/report", data);
  return res.data;
};
