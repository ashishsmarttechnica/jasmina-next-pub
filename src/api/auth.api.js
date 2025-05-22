import axios from "@/lib/axios";

export const loginUser = async (data) => {
  const res = await axios.post("/login", data);
  return res.data;
};

export const signupUser = async (data) => {
  const endpoint =
    data.accountType === "Company" ? "/create/company" : "/create/user";
  const res = await axios.post(endpoint, data);
  return res.data;
};

export const verifyOtp = async ({ email, otp }) => {
  const res = await axios.post("/verify/otp", { email, otp });
  return res.data;
};

export const resendOtp = async ({ email }) => {
  const res = await axios.post("/resend/otp", { email });
  return res.data;
};

export const getUser = async (id) => {
  const res = await axios.get(`/get/profile/?id=${id}`);
  // console.log("API response:", res.data); // log the entire response
  return res.data;
};

export const updateUserProfile = async ({ data, userId }) => {
  const res = await axios.put(`/update/user/?id=${userId}`, data);
  return res.data;
};
