import axios from "@/lib/axios";

export const generateChatRoom = async ({ userId, profileId }) => {
  try {
    const response = await axios.get(`/generate/room?userId=${userId}&profileId=${profileId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConversations = async (userId) => {
  try {
    const response = await axios.get(`/get/conversations/?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMessages = async (roomId, limit = 200, page = 1) => {
  try {
    const response = await axios.get(`/messages?limit=${limit}&page=${page}&roomId=${roomId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendMessage = async ({ senderId, receiverId, content }) => {
  try {
    const formData = new FormData();
    formData.append("senderId", senderId);
    formData.append("receiverId", receiverId);
    formData.append("content", content);

    const response = await axios.post("/messages", formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
