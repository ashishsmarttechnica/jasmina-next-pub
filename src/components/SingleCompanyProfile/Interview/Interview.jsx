"use client";
import { cancelInterview, getAllInterviews } from "@/api/interview.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import Cookies from "js-cookie";
import { useRef, useState } from "react";
import SetInterviewModal from "../../../modal/SetInterviewModal";

const Interviews = () => {
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [page, setPage] = useState(1);
  const [isSetInterviewOpen, setIsSetInterviewOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const limit = 10;
  const queryClient = useQueryClient();

  const getStatusNumber = (status) => {
    switch (status) {
      case "Upcoming":
        return 0;
      case "Pending":
        return 1;
      case "Past":
        return 2;
      default:
        return 0;
    }
  };

  const {
    data: interviewData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["interviews", activeTab, page],
    queryFn: () =>
      getAllInterviews({
        page,
        limit,
        status: getStatusNumber(activeTab),
        companyId: Cookies.get("userId"),
      }),
  });

  const interviews = interviewData?.data?.jobs || [];
  console.log(interviews, "interviews");

  const handleCancelInterview = async (interviewId) => {
    try {
      await cancelInterview(interviewId);
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    } catch (error) {
      console.error("Error canceling interview:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-primary">Loading Interviews...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-red-500">Error loading Interviews. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* Tabs */}
      <div className="flex gap-2">
        {["Upcoming", "Pending", "Past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium shadow-md ${
              activeTab === tab
                ? "bg-primary text-white"
                : "hover:bg-secondary hover:text-primary bg-[#F2F2F2] text-[#888DA8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="rounded-lg bg-white shadow-md">
          {interviews.map((interview, index) => (
            <div
              key={interview._id}
              className="flex cursor-pointer items-center justify-between border-b border-gray-100 px-5 py-3 hover:bg-gray-50"
            >
              <div className="block">
                <h3 className="text-[14px] font-medium">{interview.fullName}</h3>
                <p className="text-sm text-gray-500">{interview.jobRole}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-sm text-black">
                  <p>{format(new Date(interview.date), "dd/MM/yyyy")}</p>
                  <span className="px-1">·</span>
                  <p>{interview.startTime}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-primary hover:text-primary hover:border-primary mx-2 w-full rounded-sm px-3 py-2 text-[13px] text-white hover:border hover:bg-white sm:mx-2 sm:w-auto"
                  onClick={() => setIsSetInterviewOpen(true)}
                >
                  Reschedule
                </button>
                <button
                  className="text-primary border-primary w-full rounded border px-4 py-1.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                  onClick={() => handleCancelInterview(interview._id)}
                >
                  Cancel
                </button>
              </div>
              <SetInterviewModal
                isOpen={isSetInterviewOpen}
                onClose={() => setIsSetInterviewOpen(false)}
                jobId={interview.jobId}
                candidateData={selectedApplicant}
              />
            </div>
          ))}
          {interviews.length === 0 && (
            <div className="p-5 text-center text-sm text-gray-500">
              No interviews in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
