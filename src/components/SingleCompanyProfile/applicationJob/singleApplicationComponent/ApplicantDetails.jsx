import { updateApplicationStatus } from "@/api/job.api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import { RxDownload } from "react-icons/rx";
import { toast } from "react-toastify";

// Convert numeric status to readable text
const getStatusText = (status) => {
  const numericStatus = parseInt(status);
  switch (numericStatus) {
    case 1:
      return "New";
    case 2:
      return "Reviewed";
    case 3:
      return "Interviewed";
    case 4:
      return "Approved";
    case 5:
      return "Rejected";
    case 6:
      return "Hired";
    default:
      return "New";
  }
};

const ApplicantDetails = ({ selectedApplicant, setIsSetInterviewOpen }) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (selectedApplicant?.resume) {
      // Log the resume URL for debugging
      setResumeUrl(selectedApplicant.resume);
    }
  }, [selectedApplicant]);

  if (!selectedApplicant) return null;

  // Log the selected applicant for debugging

  const isInterviewFixed = selectedApplicant.status === "2";

  const handleStatusChange = async (e) => {
    const newStatus = parseInt(e.target.value);
    setIsUpdating(true);
    // console.log("Updating application status with:", {
    //   userId: selectedApplicant.userId,
    //   jobId: selectedApplicant.jobId,
    //   status: newStatus,
    // });
    try {
      await updateApplicationStatus({
        userId: selectedApplicant.userId,
        jobId: selectedApplicant.jobId,
        status: newStatus,
      });

      // Invalidate and refetch the applicants query
      queryClient.invalidateQueries(["applicants"]);
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full lg:w-[60%]">
      <div className="rounded-lg bg-white p-2 shadow-md sm:p-6">
        <div className="flex items-start justify-between border-b border-slate-200 py-2">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-gray-900 sm:text-xl">
                {selectedApplicant.name || "Unknown"}
              </h2>
              <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                {selectedApplicant.title || ""}
              </h3>
              <p className="text-sm text-blue-600 sm:text-base">
                {selectedApplicant.email || "No email provided"}
              </p>
              <p className="text-sm text-gray-500 sm:text-base">
                {selectedApplicant.experience
                  ? `${selectedApplicant.experience} years experience`
                  : "Experience not specified"}
              </p>
              {resumeUrl && (
                <div className="mt-5 mb-4 flex items-center justify-between">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-md flex items-center gap-2 font-bold text-blue-600"
                  >
                    Download CV <RxDownload />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="flex flex-col items-end">
              <select
                className="mb-3 rounded-md border border-none bg-slate-100 px-6 py-2"
                defaultValue={selectedApplicant.status || 0}
                onChange={handleStatusChange}
                disabled={isUpdating}
              >
                <option value={0}>New</option>
                <option value={1}>Reviewed</option>
                <option value={2}>Interviewed</option>
                <option value={3}>Approved</option>
                <option value={4}>Rejected</option>
                <option value={5}>Hired</option>
              </select>
              <button
                className={`mt-12 flex items-center rounded-md px-4 py-2 text-white ${
                  isInterviewFixed ? "bg-primary cursor-not-allowed" : "bg-primary"
                }`}
                onClick={() => {
                  if (!isInterviewFixed) {
                    setIsSetInterviewOpen({
                      name: selectedApplicant.name,
                      email: selectedApplicant.email,
                      jobRole: selectedApplicant.title,
                      experience: selectedApplicant.experience,
                      resume: selectedApplicant.resume,
                      userId: selectedApplicant.userId,
                    });
                  }
                }}
                disabled={isInterviewFixed}
              >
                <FaCalendarCheck className="mr-2" />
                {isInterviewFixed ? "Interview Fixed" : "Set Interview"}
              </button>
            </div>
          </div>
        </div>

        {/* Additional applicant information */}
        {/* {selectedApplicant.originalData && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="mb-2 text-lg font-medium">Additional Information</h3>

            {selectedApplicant.phone && (
              <div className="mb-2">
                <span className="font-medium">Phone:</span> {selectedApplicant.phone}
              </div>
            )}

            {selectedApplicant.originalData.message && (
              <div className="mb-2">
                <span className="font-medium">Message:</span>{" "}
                {selectedApplicant.originalData.message}
              </div>
            )}

            {selectedApplicant.createdAt && (
              <div className="mb-2">
                <span className="font-medium">Applied on:</span>{" "}
                {new Date(selectedApplicant.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ApplicantDetails;
