import { formatDate, getJobStatusLabel } from "@/utils/singleApplicationUtils";
import { FiMoreVertical } from "react-icons/fi";

const JobHeader = ({ jobData }) => {
  return (
    <div className="border-primary mt-4 mb-4 rounded-lg border bg-[#F0FDF4] p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[16px] font-medium">{jobData?.jobTitle}</h1>
          <div className="text-gray-500 text-[13px]">
            {jobData?.employeeType} | {jobData?.seniorityLevel}
          </div>
        </div>
        <div className="block items-center gap-2">
          <div className="text-gray-500 text-[13px]">{jobData?.createdAt && formatDate(jobData.createdAt)}</div>
          <div className="text-gray-500 text-[13px]">
            {jobData?.deadline
              ? ` ${new Date(jobData?.deadline).toLocaleDateString()}`
              : jobData?.timeAgo}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`rounded-md px-3 py-1 text-sm ${
              jobData?.status === "Closed" || jobData?.status === 1
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {getJobStatusLabel(jobData?.status)}
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
