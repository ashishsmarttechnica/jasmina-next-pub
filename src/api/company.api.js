import axios from "@/lib/axios";

export const updateCompanyProfile = async ({ data, userId }) => {
  const res = await axios.put(`/update/company/?id=${userId}`, data);
  return res.data;
};

export const getCompany = async (id) => {
  const res = await axios.get(`/get/company/profile/?id=${id}`);
  // console.log("API response:", res.data); // log the entire response
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

export const getCompanyAppliedJob = async (id) => {
  const res = await axios.get(`/getcompany/job?id=${id}`);
  return res.data;
};

export const getAllApplicants = async (jobId, page = 1, limit = 10, status = "all") => {
  const res = await axios.get(`/job/applications?jobId=${jobId}&page=${page}&limit=${limit}`);
  return res.data;
};

export const checkCompanyVerification = async (companyId) => {
  const response = await axios.get(`/api/v1/isVerified?companyId=${companyId}`);
  return response.data;
};
