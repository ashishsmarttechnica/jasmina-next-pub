import axios from "@/lib/axios";

export const getAllInterviews = async ({ page = 1, limit = 10, status = 0 }) => {
  try {
    const response = await axios.get(
      `/applied-interviews?page=${page}&limit=${limit}&status=${status}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const scheduleInterview = async (data) => {
  try {
    const response = await axios.post("/interview/apply", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelInterview = async (interviewId) => {
  try {
    const response = await axios.delete(`cancel/interview?interviewId=${interviewId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

