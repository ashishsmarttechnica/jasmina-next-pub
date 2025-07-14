import axios from "@/lib/axios";

export const getAllMemberships = async () => {
  const res = await axios.get("/get/all/membership");
  return res.data;
};

export const getPreviousPlans = async (companyId) => {
  const res = await axios.get(`/previous-plan/${companyId}`);
  return res.data;
};

export const purchasePlan = async (purchaseData) => {
  const res = await axios.post("/purchase-plan", purchaseData);
  return res.data;
};
