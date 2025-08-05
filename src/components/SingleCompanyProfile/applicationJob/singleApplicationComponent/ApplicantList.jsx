import ViewJobModal from "@/modal/ViewJobModal";
import { getStatusColor, getStatusText } from "@/utils/singleApplicationUtils";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";

const ApplicantList = ({ applicants, selectedApplicant, handleApplicantClick }) => {
  const [moreOptionsDropdownId, setMoreOptionsDropdownId] = useState(null);
  const moreOptionsRefs = useRef({});

  // State for view job modal
  const [viewJobModalOpen, setViewJobModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const handleMoreOptionsClick = (e, applicantId) => {
    e.stopPropagation();
    console.log("More options clicked for applicant:", applicantId);
    console.log("Current dropdown ID:", moreOptionsDropdownId);
    setMoreOptionsDropdownId(moreOptionsDropdownId === applicantId ? null : applicantId);
  };

  const handleCloseMoreOptions = () => {
    setMoreOptionsDropdownId(null);
  };

  const handleViewJob = (jobId) => {
    setSelectedJobId(jobId);
    setViewJobModalOpen(true);
    setMoreOptionsDropdownId(null); // Close dropdown
  };

  const closeViewJobModal = () => {
    setViewJobModalOpen(false);
    setSelectedJobId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideMoreOptionsDropdowns = Object.values(moreOptionsRefs.current).every(
        (ref) => !ref || !ref.contains(event.target)
      );

      if (isOutsideMoreOptionsDropdowns && moreOptionsDropdownId) {
        setMoreOptionsDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [moreOptionsDropdownId]);

  if (!applicants || applicants.length === 0) {
    return (
      <div className="w-full rounded-lg bg-white p-6 text-center shadow-md lg:w-[40%]">
        No applicants found
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-white shadow-md lg:w-[40%]">
      {applicants.map((applicant) => {
        // Use the utility function to get status text
        const statusText = getStatusText(applicant.status);

        // Debug the applicant data
        console.log("Applicant Status:", applicant.status, "Status Text:", statusText);

        return (
          <div
            key={applicant._id || applicant.id}
            className={`flex cursor-pointer flex-col border-b border-gray-100 p-4 transition-colors duration-150 hover:bg-gray-100 sm:flex-row sm:items-center sm:justify-between ${
              selectedApplicant?._id === applicant._id
                ? "border-l-4 border-[#0a66c2] bg-[#e7f3ff]"
                : ""
            }`}
            onClick={() => {
              handleApplicantClick(applicant);
            }}
          >
            <div className="flex-1">
              <h3
                className={`text-[15px] font-medium ${
                  selectedApplicant?._id === applicant._id ? "font-bold text-[#0a66c2]" : ""
                }`}
              >
                {applicant.name || "Unknown"}
              </h3>
              <p className="text-sm text-gray-500">{applicant.location || "No location"}</p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4 sm:mt-0">
              <div className="flex items-center gap-2">
                <span className={`rounded-md px-3 py-1 text-sm ${getStatusColor(statusText)}`}>
                  {statusText}
                </span>
              </div>
              <FiMoreVertical size={25} className="rounded-md bg-[#F2F2F2] p-1 text-[#000]" />
            </div>
          </div>
        );
      })}
      <ViewJobModal isOpen={viewJobModalOpen} onClose={closeViewJobModal} jobId={selectedJobId} />
    </div>
  );
};

export default ApplicantList;
