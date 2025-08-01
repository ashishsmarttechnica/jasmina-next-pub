import { updateApplicationStatus } from "@/api/job.api";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaDownload,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperclip,
  FaPhone,
} from "react-icons/fa";
import { toast } from "react-toastify";
import getImg from "../../../../lib/getImg";

// Convert numeric status to readable text
const getStatusText = (status) => {
  const numericStatus = parseInt(status);
  switch (numericStatus) {
    case 1:
      return "New";
    case 2:
      return "Interviewing";
    case 3:
      return "Approved";
    case 4:
      return "Rejected";
    case 5:
      return "Hired";
    case 6:
      return "Reviewed";
    default:
      return "New";
  }
};

const ApplicantDetails = ({ selectedApplicant, setIsSetInterviewOpen, applicants }) => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingViewResume, setIsLoadingViewResume] = useState(false);
  const queryClient = useQueryClient();
  const resume = selectedApplicant?.resume || selectedApplicant?.appliedCV;

  console.log(applicants, "applicantsData___________________");
  useEffect(() => {
    if (resume) {
      setResumeUrl(resume);
    }
  }, [resume]);

  if (!selectedApplicant) return null;

  const isInterviewFixed = selectedApplicant.status === "2";

  const getGoogleDocsViewerUrl = (url) => {
    let absoluteUrl = url;
    if (!url.startsWith("http")) {
      const baseUrl = window.location.origin;
      absoluteUrl = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
    }
    return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=false`;
  };

  let fileName, fileUrl, fileExtension;
  if (typeof resume === "string") {
    fileName = resume.split("/").pop();
    fileUrl = getImg(resume);
    fileExtension = fileName.split(".").pop()?.toLowerCase();
  }

  const handleView = () => {
    if (!fileUrl) return;
    setIsLoadingViewResume(true);
    try {
      const viewerUrl = getGoogleDocsViewerUrl(fileUrl);
      window.open(viewerUrl, "_blank");
    } catch (error) {
      console.error("Error opening document:", error);
      window.open(fileUrl, "_blank");
    } finally {
      setIsLoadingViewResume(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = parseInt(e.target.value);
    setIsUpdating(true);
    try {
      await updateApplicationStatus({
        userId: selectedApplicant.userId,
        jobId: selectedApplicant.jobId,
        status: newStatus,
      });
      queryClient.invalidateQueries(["applicants"]);
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error?.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPreferredStartDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full lg:w-[60%]">
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Header Section */}
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="mb-1 text-xl font-bold text-gray-900">
                {selectedApplicant?.fullName
                  ? selectedApplicant.fullName.charAt(0).toUpperCase() +
                    selectedApplicant.fullName.slice(1)
                  : selectedApplicant?.name ||
                    selectedApplicant?.userName?.charAt(0).toUpperCase() +
                      selectedApplicant?.userName?.slice(1) ||
                    "Unknown"}
              </h2>

              {/* Contact Info */}
              <div className="block flex-wrap gap-4 text-sm text-gray-600">
                {selectedApplicant.email && (
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" />
                    <span>{selectedApplicant.email}</span>
                  </div>
                )}

                {selectedApplicant.phone && (
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-green-500" />
                    <span>{selectedApplicant.phone}</span>
                  </div>
                )}
                {selectedApplicant.location && (
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>{selectedApplicant.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex flex-col items-end gap-3">
              <select
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                value={selectedApplicant.originalData?.status || selectedApplicant.status}
                onChange={handleStatusChange}
                disabled={isUpdating}
              >
                <option value={1}>New</option>
                <option value={2}>Interviewing</option>
                <option value={3}>Approved</option>
                <option value={4}>Rejected</option>
                <option value={5}>Hired</option>
                <option value={6}>Reviewed</option>
              </select>

              <button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isInterviewFixed
                    ? "cursor-not-allowed bg-gray-100 text-gray-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => {
                  if (!isInterviewFixed) {
                    setIsSetInterviewOpen({
                      name:
                        selectedApplicant.fullName ||
                        selectedApplicant.name ||
                        selectedApplicant.userName,
                      email: selectedApplicant.email,
                      jobRole: selectedApplicant.title,
                      experience: selectedApplicant.experience,
                      resume: resume,
                      userId: selectedApplicant.userId,
                    });
                  }
                }}
                disabled={isInterviewFixed}
              >
                <FaCalendarCheck />
                {isInterviewFixed ? "Interview Fixed" : "Set Interview"}
              </button>
            </div>
          </div>
        </div>

        {/* Resume Section */}
        {resume && (
          <div className="border-b border-gray-100 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-md mb-1 font-semibold text-gray-900">Resume/CV</h3>
                <p className="text-sm text-gray-600">{fileName}</p>
              </div>
              <button
                onClick={handleView}
                className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <FaDownload />
                View Resume
              </button>
            </div>
          </div>
        )}
        {selectedApplicant.originalData?.attechments &&
          selectedApplicant.originalData?.attechments.length > 0 && (
            <div className="border-b border-gray-100 p-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Attachments</h3>

              <div className="space-y-2">
                {selectedApplicant.originalData.attechments.map((attachment, index) => {
                  const fileName =
                    typeof attachment === "string"
                      ? attachment.split("/").pop()
                      : attachment.url?.split("/").pop() || "Attachment";

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <FaPaperclip className="text-gray-500" />
                        <span className="text-xs font-medium text-gray-700">{fileName}</span>
                      </div>
                      <button
                        onClick={() => {
                          const fileUrl =
                            typeof attachment === "string"
                              ? getImg(attachment)
                              : getImg(attachment.url);
                          window.open(fileUrl, "_blank");
                        }}
                        className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                      >
                        <FaDownload />
                        View
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Application Details */}
        <div className="border-b border-gray-100 p-4">
          <h3 className="mb-3 text-base font-semibold text-gray-900">Application Details</h3>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* Personal Information */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Personal Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                    <FaEnvelope className="text-xs text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-xs font-medium text-gray-900">
                      {selectedApplicant.email || "Not provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50">
                    <span className="text-xs font-bold text-indigo-600">$</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="text-xs font-medium text-gray-900">
                      {selectedApplicant.originalData?.salaryExpectation || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Information */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Application Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-50">
                    <FaCalendarCheck className="text-xs text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-xs font-medium text-gray-900">
                      {selectedApplicant.originalData?.preferredStartDate
                        ? formatPreferredStartDate(
                            selectedApplicant.originalData.preferredStartDate
                          )
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-50">
                    <FaCalendarCheck className="text-xs text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Availability</p>
                    <p className="text-xs font-medium text-gray-900">
                      {selectedApplicant.originalData?.currentAvailability || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          {selectedApplicant.originalData?.message && (
            <div className="mt-3">
              <h4 className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">
                Cover Message
              </h4>
              <div className="rounded bg-gray-50 p-3">
                <p className="text-xs leading-relaxed text-gray-700">
                  {selectedApplicant.originalData.message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetails;
