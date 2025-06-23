import { createReport } from "@/api/report.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useCreateReport = () => {
  return useMutation({
    mutationFn: createReport,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Report submitted successfully");
      } else {
        toast.error(data?.message || "Failed to submit report");
      }
    },
    onError: (error) => {
      console.error("Error submitting report:", error);
      toast.error(error.response?.data?.message || "Failed to submit report");
    },
  });
};
