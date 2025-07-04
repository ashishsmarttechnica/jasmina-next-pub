"use client";
import Selecter from "@/common/Selecter";
import useSingleCompanyAppliedJob from "@/hooks/company/singleCompany/useSingleCompanyAppliedJob";
import { Link, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { getRelativeTime } from "../../../utils/dateUtils";
import SearchBar from "./SearchBar";

const Applications = () => {
  const router = useRouter();
  const params = useParams();

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const {
    data: getCompanyAppliedJob,
    isLoading: isGetCompanyAppliedJobLoading,
    isError: isGetCompanyAppliedJobError,
    error: getCompanyAppliedJobError,
  } = useSingleCompanyAppliedJob(params.id);

  const statusOptions = [
    { value: "All Status", label: "All Status" },
    { value: "Open", label: "Open" },
    { value: "Closed", label: "Closed" },
    { value: "In Progress", label: "In Progress" },
  ];
  const getStatusLabel = (status) => {
    switch (status) {
      case 0:
        return "Open";
      case 1:
        return "Closed";
      case 2:
        return "In Progress";
      default:
        return "Unknown";
    }
  };
  //
  const handleJobClick = (item) => {
    router.push(`/company/single-company/${params.id}/applications/${item._id}`);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  if (isGetCompanyAppliedJobLoading) return <div>Loading...</div>;
  if (isGetCompanyAppliedJobError) return <div>Error: {getCompanyAppliedJobError?.message}</div>;

  const jobListings = getCompanyAppliedJob;
  console.log(jobListings, "jobListings");

  return (
    <div>
      <div className="flex">
        <div className="mb-5 flex w-full max-w-[720px] flex-col items-center justify-between rounded-lg bg-white p-2 shadow-sm md:flex-row">
          <div className="flex w-full items-center justify-between">
            <SearchBar />
          </div>
        </div>

        <div>
          <button className="bg-primary mx-3 rounded-sm px-3 py-2 text-[13px] text-white sm:mt-2">
            Post a Job
          </button>
        </div>
      </div>
      {/*  */}
      <div className="mb-4 flex gap-4">
        <div className="w-40">
          <Selecter
            name="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            options={statusOptions}
            placeholder="Select Status"
          />
        </div>
      </div>
      <div className="rounded-xl bg-white">
        {/* */}
        {jobListings.map((item, idx) => (
          <div
            key={item._id || idx}
            onClick={() => {
              handleJobClick(item);
            }}
            className="mb-3 flex cursor-pointer flex-col justify-between p-4 transition-all duration-300 hover:bg-gray-100 md:flex-row md:items-center"
          >
            {/* Left Block */}
            <div className="mb-3 md:mb-0">
              <h3 className="text-lg font-medium">{item.jobTitle}</h3>
              <p className="text-sm text-gray-500">
                {item.employeeType} | {item.seniorityLevel}
              </p>
            </div>

            {/* Right Block */}
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 lg:gap-12">
              {/* Time Info */}
              <div className="text-left text-sm text-gray-500 md:text-center">
                {/* <p>{new Date(item.job.createdAt).toLocaleDateString()}</p> */}
                <p>
                  {new Date(item.createdAt)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(/ /g, ", ")}
                </p>

                <p>{getRelativeTime(item.deadline)}</p>
              </div>

              {/* Status */}
              <span
                className={`flex items-center rounded-md px-3 py-1 text-sm ${
                  getStatusLabel(item.status) === "Open"
                    ? "bg-green-100 text-green-700"
                    : getStatusLabel(item.status) === "Closed"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {getStatusLabel(item.status)}
                <IoChevronDownOutline className="ml-1 text-xs" />
              </span>

              {/* Action Links */}
              <div className="flex flex-col items-start gap-2 text-sm underline md:flex-row md:items-center md:gap-4">
                <Link href={`/applicationjob/${item._id}`} className="text-blue-600">
                  New {item.newApplications}
                </Link>
                <Link href={`/applicationjob/${item._id}`} className="text-blue-600">
                  Applicant {item.totalApplications}
                </Link>
                <button className="text-gray-500 hover:text-black">
                  <FiMoreVertical
                    size={25}
                    className="rounded-sm bg-[#F2F2F2] p-[1px] text-black"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
//
export default Applications;
