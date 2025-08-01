import { formatDate } from "@/utils/singleApplicationUtils";
import { FiMoreVertical } from "react-icons/fi";

const JobHeader = ({ jobData }) => {
  console.log(jobData, "jobData++++++++++||||||||||||||||");

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
          <button className="text-gray-400">
            <FiMoreVertical size={20} className="bg-secondary p-1 text-[50px] text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
