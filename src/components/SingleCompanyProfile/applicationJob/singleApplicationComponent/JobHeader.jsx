import { formatDate, getJobStatusLabel } from "@/utils/singleApplicationUtils";

const JobHeader = ({ jobData }) => {
  return (
    <div className="border-primary mt-4 mb-4 rounded-lg border bg-[#F0FDF4] p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-medium">{jobData?.jobTitle}</h1>
        </div>
        <div className="block items-center gap-2">
          <div className="text-gray-500">{jobData?.createdAt && formatDate(jobData.createdAt)}</div>
          <div className="text-gray-500">
            {jobData?.deadline
              ? `Deadline: ${new Date(jobData?.deadline).toLocaleDateString()}`
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
          <span className="">Applicant {jobData?.totalApplications || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
