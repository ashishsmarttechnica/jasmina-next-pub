"use client";

import SetInterviewModal from "@/modal/SetInterviewModal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendarCheck } from "react-icons/fa6";
import { FiMoreVertical } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { RxDownload } from "react-icons/rx";
import SearchBar from "../applications/SearchBar";

const SingleApplication = () => {
  const searchParams = useSearchParams();
  // Get the item parameter from URL and parse it
  const itemParam = searchParams.get("item");
  const [jobData, setJobData] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isSetInterviewOpen, setIsSetInterviewOpen] = useState(false);

  // Combine with dummy data or use dummy data if no applications are available
  const applicants = [
    {
      id: 1,
      name: "Jerome Bell",
      location: "Coppell, Virginia",
      email: "status@gmail.com",
      status: "New",
    },
    {
      id: 2,
      name: "Darrell Steward",
      location: "Lansing, Illinois",
      status: "Interviewed",
    },
    {
      id: 3,
      name: "Kristin Watson",
      location: "Kent, Utah",
      status: "Reviewed",
      email: "kristinwatson@gamil.com",
      title: "Frontend Developer",
      experience: "5 Year of Experience in this Field",
    },
    {
      id: 4,
      name: "Guy Hawkins",
      location: "Stockton, New Hampshire",
      status: "Approved",
    },
    {
      id: 5,
      name: "Esther Howard",
      location: "Pasadena, Oklahoma",
      status: "Hired",
    },
    {
      id: 6,
      name: "Arlene McCoy",
      location: "Lafayette, California",
      status: "Interviewed",
    },
    {
      id: 7,
      name: "Floyd Miles",
      location: "Syracuse, Connecticut",
      status: "Reviewed",
    },
    {
      id: 8,
      name: "Brooklyn Simmons",
      location: "Great Falls, Maryland",
      status: "Interviewed",
    },
    {
      id: 9,
      name: "Darlene Robertson",
      location: "Portland, Illinois",
      status: "Reviewed",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "text-gray-500";
      case "Interviewed":
        return " text-gray-500";
      case "Reviewed":
        return "text-gray-500";
      case "Approved":
        return "text-gray-500";
      case "Hired":
        return "text-gray-500";
      default:
        return "text-gray-500";
    }
  };

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant);
  };

  useEffect(() => {
    if (itemParam) {
      try {
        const parsedItem = JSON.parse(decodeURIComponent(itemParam));
        setJobData(parsedItem);
      } catch (error) {
        console.error("Error parsing item data:", error);
      }
    }
  }, [itemParam]);

  return (
    <div>
      {/* Search and Post Job */}
      <div className="flex">
        <div className="mb-2 flex w-[720px] items-center justify-between rounded-lg bg-white p-2 shadow-md sm:mb-0">
          <div className="flex w-full items-center justify-between">
            <SearchBar />
          </div>
        </div>
        <div>
          <button className="bg-primary mx-2 w-full rounded-sm px-3 py-2 text-[13px] text-white sm:mx-2 sm:mt-2 sm:w-auto">
            Post a Job
          </button>
        </div>
      </div>

      {/* Job Header */}
      <div className="border-primary mt-4 mb-4 rounded-lg border bg-[#F0FDF4] p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg font-medium">{jobData?.jobTitle}</h1>
          </div>
          <div className="block items-center gap-2">
            <div className="text-gray-500">
              {new Date(jobData?.createdAt)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
                .replace(/ /g, ", ")}
            </div>
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
              {typeof jobData?.status === "number"
                ? jobData?.status === 0
                  ? "Open"
                  : jobData?.status === 1
                    ? "Closed"
                    : "In Progress"
                : jobData?.status}
            </span>
            <span className="">Applicant {jobData?.totalApplications || 0}</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4 flex flex-wrap gap-2 sm:gap-4">
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] font-medium text-gray-600 shadow-sm sm:px-4">
          All
        </button>
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] text-gray-600 shadow-sm sm:px-4">
          New
        </button>
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] text-gray-600 shadow-sm sm:px-4">
          Review
        </button>
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] text-gray-600 shadow-sm sm:px-4">
          Interviewing
        </button>
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] text-gray-600 shadow-sm sm:px-4">
          Approved
        </button>
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] text-gray-600 shadow-sm sm:px-4">
          Rejected
        </button>
        <button className="rounded-md bg-[#F2F2F2] px-3 py-2 text-[13px] text-gray-600 shadow-sm sm:px-4">
          Hired
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Applicants List */}
        <div className="w-full rounded-lg bg-white shadow-md lg:w-[40%]">
          {applicants.map((applicant) => (
            <div
              key={applicant.id}
              className={`flex cursor-pointer flex-col border-b border-gray-100 p-4 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between ${selectedApplicant?.id === applicant.id ? "bg-gray-50" : ""}`}
              onClick={() => handleApplicantClick(applicant)}
            >
              <div className="flex-1">
                <h3 className="text-[15px] font-medium">{applicant.name}</h3>
                <p className="text-sm text-gray-500">{applicant.location}</p>
              </div>
              <div className="mt-2 flex items-center justify-between gap-4 sm:mt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-md px-3 py-1 text-sm ${getStatusColor(applicant.status)}`}
                  >
                    {applicant.status}
                    {applicant.status === "New" && <IoChevronDownOutline className="ml-1 inline" />}
                  </span>
                </div>
                <button className="text-gray-400">
                  <FiMoreVertical size={20} className="bg-secondary p-1 text-[50px] text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Applicant Details */}
        <div className="w-full lg:w-[60%]">
          {selectedApplicant && (
            <div className="rounded-lg bg-white p-2 shadow-md sm:p-6">
              <div className="flex items-start justify-between border-b border-slate-200 py-2">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-xl">
                      {selectedApplicant.name}
                    </h2>
                    <h3 className="text-base font-medium text-gray-900 sm:text-lg">
                      {selectedApplicant.title || ""}
                    </h3>
                    <p className="text-sm text-blue-600 sm:text-base">
                      {selectedApplicant.email || "No email provided"}
                    </p>
                    <p className="text-sm text-gray-500 sm:text-base">
                      {selectedApplicant.experience || "Experience not specified"}
                    </p>
                    <div className="mt-5 mb-4 flex items-center justify-between">
                      <a
                        href="#"
                        className="text-md flex items-center gap-2 font-bold text-blue-600"
                      >
                        Download CV <RxDownload />
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-end">
                    <select className="mb-3 rounded-md border border-none bg-slate-100 px-6 py-2">
                      <option>New</option>
                      <option>Pending</option>
                      <option>Hired</option>
                    </select>
                    <button
                      className="bg-primary mt-12 flex items-center rounded-md px-4 py-2 text-white"
                      onClick={() => setIsSetInterviewOpen(true)}
                    >
                      <FaCalendarCheck className="mr-2" />
                      Set Interview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <SetInterviewModal isOpen={isSetInterviewOpen} onClose={() => setIsSetInterviewOpen(false)} />
    </div>
  );
};
//
export default SingleApplication;
