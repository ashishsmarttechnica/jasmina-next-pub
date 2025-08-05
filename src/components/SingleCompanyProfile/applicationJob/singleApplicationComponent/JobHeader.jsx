import { formatDate } from "@/utils/singleApplicationUtils";
import { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import ViewJobModal from "../../../../modal/ViewJobModal";

const JobHeader = ({ jobData }) => {
  console.log(jobData, "jobData++++++++++||||||||||||||||");
  const [moreOptionsDropdownId, setMoreOptionsDropdownId] = useState(null);
  const moreOptionsRefs = useRef({});

  const handleMoreOptionsClick = (e, jobId) => {
    e.stopPropagation();
    setMoreOptionsDropdownId(moreOptionsDropdownId === jobId ? null : jobId);
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

  const [viewJobModalOpen, setViewJobModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

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

  // Same getStatusLabel function as in Applications.jsx
  const getStatusLabel = (status) => {
    const label = status === 0 ? "Open" : status === 1 ? "Closed" : "Closed";
    return label;
  };

  return (
    <div className="border-primary mt-4 mb-4 rounded-lg border bg-[#F0FDF4] p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[16px] font-medium">{jobData?.jobTitle}</h1>
          <div className="text-[13px] text-gray-500">
            {jobData?.employeeType} | {jobData?.seniorityLevel}
          </div>
        </div>
        <div className="block items-center gap-2">
          <div className="text-[13px] text-gray-500">
            {jobData?.createdAt && formatDate(jobData.createdAt)}
          </div>
          <div className="text-[13px] text-gray-500">
            {jobData?.deadline
              ? ` ${new Date(jobData?.deadline).toLocaleDateString()}`
              : jobData?.timeAgo}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`inline-flex cursor-pointer items-center rounded-[4px] px-3 py-1 text-[13px] font-medium transition-all duration-200 ${
              getStatusLabel(jobData?.status) === "Open"
                ? "bg-[#DCFCE7] text-[#166534]"
                : getStatusLabel(jobData?.status) === "Closed"
                  ? "bg-red-100 text-red-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {getStatusLabel(jobData?.status)}
          </span>
          <span className="">Applicant {jobData?.applicants}</span>
          <div className="relative">
            <div ref={(el) => (moreOptionsRefs.current[jobData._id] = el)}>
              <button
                className="text-gray-400"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoreOptionsClick(e, jobData._id);
                }}
              >
                <FiMoreVertical size={25} className="rounded-md bg-[#F2F2F2] p-1 text-[#000]" />
                {moreOptionsDropdownId === jobData._id && (
                  <div className="absolute top-full right-0 z-50 mt-1 min-w-[140px] rounded-md border border-gray-200 bg-white shadow-lg">
                    <button
                      className="flex w-full items-center px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewJob(jobData._id);
                      }}
                    >
                      <FaEye className="mr-2 h-4 w-4" />
                      View Job
                    </button>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ViewJobModal isOpen={viewJobModalOpen} onClose={closeViewJobModal} jobId={selectedJobId} />
    </div>
  );
};

export default JobHeader;
