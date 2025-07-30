"use client";
import Selecter from "@/common/Selecter";
import useSingleCompanyAppliedJob from "@/hooks/company/singleCompany/useSingleCompanyAppliedJob";
import useUpdateJobStatus from "@/hooks/company/singleCompany/useUpdateJobStatus";
import { Link, useRouter } from "@/i18n/navigation";
import useSingleCompanyAppliedJobStore from "@/store/singleCopanyAppliedJob.store";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiMoreVertical } from "react-icons/fi";
import { getRelativeTime } from "../../../utils/dateUtils";
import SearchBar from "./SearchBar";

const Applications = () => {
  const router = useRouter();
  const params = useParams();
  const setSelectedJob = useSingleCompanyAppliedJobStore((state) => state.setSelectedJob);

  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const dropdownRef = useRef(null);

  const statusOptions = [
    { value: "All Status", label: "All Status", numericValue: "" },
    { value: "Open", label: "Open", numericValue: "0" },
    { value: "Closed", label: "Closed", numericValue: "1" },
  ];

  // Get the numeric status value for API call
  const getStatusValue = (selectedStatus) => {
    const option = statusOptions.find((opt) => opt.value === selectedStatus);
    return option ? option.numericValue : "";
  };

  const {
    data: getCompanyAppliedJob,
    isLoading: isGetCompanyAppliedJobLoading,
    isError: isGetCompanyAppliedJobError,
    error: getCompanyAppliedJobError,
    refetch: refetchJobs,
  } = useSingleCompanyAppliedJob(params.id, searchQuery, getStatusValue(selectedStatus));

  // Add the update job status mutation
  const { mutate: updateJobStatus, isPending: isUpdatingStatus } = useUpdateJobStatus();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusLabel = (status, jobId) => {
    const label = status === 0 ? "Open" : status === 1 ? "Closed" : "Unknown";
    return label;
  };

  const handleStatusClick = (e, jobId, currentStatus) => {
    e.stopPropagation();
    // Don't toggle dropdown if status is Closed
    if (currentStatus === 1) return;
    // Toggle dropdown
    toggleDropdown(jobId);
  };

  const handleStatusChange = (jobId, newStatus, currentStatus) => {
    console.log("Current Status:", currentStatus, "New Status:", newStatus); // For debugging

    // Call the API to update job status
    updateJobStatus({
      jobId: jobId,
      status: newStatus,
    });

    // Close dropdown immediately for better UX
    setOpenDropdownId(null);
  };

  const toggleDropdown = (jobId) => {
    // Don't allow dropdown to open if status is Closed
    const job = jobListings.find((item) => item._id === jobId);
    if (job?.status === 1) return;
    setOpenDropdownId(openDropdownId === jobId ? null : jobId);
  };

  //
  const handleJobClick = (item) => {
    setSelectedJob(item); // Store the selected job data
    router.push(`/company/single-company/${params.id}/applications/${item._id}`);
  };

  const handleStatusChangeFilter = (e) => {
    setSelectedStatus(e.target.value);
    // Trigger search when status changes
    setTimeout(() => {
      refetchJobs();
    }, 100);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSearchSubmit = () => {
    setIsSearching(true);
    refetchJobs().finally(() => {
      setIsSearching(false);
    });
  };

  // if (isGetCompanyAppliedJobLoading) return <div>Loading...</div>;
  // if (isGetCompanyAppliedJobError)
  //   return (
  //     <div className="mx-auto flex h-[512px] min-h-[512px] w-[828px] min-w-[828px] items-center justify-center">
  //       <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-100 bg-white shadow-md">
  //         {/* Modern illustration icon */}
  //         <svg
  //           className="text-primary-500 mb-4 h-16 w-16"
  //           fill="none"
  //           stroke="currentColor"
  //           strokeWidth="1.5"
  //           viewBox="0 0 48 48"
  //         >
  //           <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="#f3f4f6" />
  //           <path
  //             d="M16 28c0-4 8-4 8-8s-8-4-8-8"
  //             stroke="#a5b4fc"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             fill="none"
  //           />
  //           <path
  //             d="M32 20c0 4-8 4-8 8s8 4 8 8"
  //             stroke="#818cf8"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             fill="none"
  //           />
  //         </svg>
  //         <p className="mb-2 text-center text-[20px] font-semibold text-gray-700">Error Occurred</p>
  //         <p className="mb-6 max-w-xs text-center text-[15px] text-gray-500">
  //           {getCompanyAppliedJobError?.message ||
  //             "Something went wrong while fetching applications. Please try again later."}
  //         </p>
  //       </div>
  //     </div>
  //   );

  const jobListings = getCompanyAppliedJob || [];
  console.log(jobListings, "jobListings");

  return (
    <div>
      <div className="flex">
        <div className="mb-5 flex w-full max-w-[720px] flex-col items-center justify-between rounded-lg bg-white p-2 shadow-sm md:flex-row">
          <div className="flex w-full items-center justify-between">
            <SearchBar
              searchValue={searchQuery}
              onSearch={handleSearch}
              onSearchSubmit={handleSearchSubmit}
              isSearching={isSearching}
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mb-4 flex gap-4">
        <div className="w-40">
          <Selecter
            name="status"
            value={selectedStatus}
            onChange={handleStatusChangeFilter}
            options={statusOptions}
            placeholder="Select Status"
          />
        </div>
      </div>
      <div className="rounded-xl bg-white">
        {/* */}
        {jobListings && jobListings.length > 0 ? (
          jobListings.map((item, idx) => (
            // console.log(item, "item++++++++++++++++++"),
            <div
              key={item._id || idx}
              onClick={() => {
                handleJobClick(item);
              }}
              className="flex cursor-pointer items-center justify-between border-b border-[#E4E6EA] px-6 py-4 transition-all duration-300 hover:bg-gray-50"
            >
              {/* Left section - Title and Type */}
              <div className="flex-[2]">
                <h3 className="text-[15px] font-medium text-[#1B1B1B]">{item.jobTitle}</h3>
                <p className="text-[13px] text-[#888DA8]">
                  {item.employeeType} | {item.seniorityLevel}
                </p>
              </div>

              {/* Middle section - Date and Time */}
              <div className="flex-1 text-center">
                <p className="text-[13px] text-[#888DA8]">
                  {new Date(item.createdAt)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .replace(/ /g, ", ")}
                </p>
                <p className="text-[13px] text-[#888DA8]">{getRelativeTime(item.deadline)}</p>
              </div>

              {/* Applicants count */}
              <div className="flex-1 text-right">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusClick(e, item._id, item.status);
                    }}
                    disabled={isUpdatingStatus}
                    className={`inline-flex cursor-pointer items-center rounded-[4px] px-3 py-1 text-[13px] font-medium transition-all duration-200 hover:opacity-80 ${
                      getStatusLabel(item.status) === "Open"
                        ? "bg-[#DCFCE7] text-[#166534]"
                        : getStatusLabel(item.status) === "Closed"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    } ${isUpdatingStatus ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    {isUpdatingStatus && item._id === openDropdownId ? (
                      <>
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      <>
                        <span>{getStatusLabel(item.status)}</span>
                        {/* Only show dropdown icon if status is not Closed */}
                        {item.status !== 1 && <FiChevronDown className="ml-1" size={16} />}
                      </>
                    )}
                  </button>

                  {/* Dropdown Menu - Only show if status is not Closed */}
                  {openDropdownId === item._id && item.status !== 1 && (
                    <div className="absolute top-full right-0 z-50 mt-1 min-w-[120px] rounded-md border border-gray-200 bg-white shadow-lg">
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(item._id, 1, item.status);
                          }}
                          disabled={isUpdatingStatus}
                          className={`block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 ${
                            isUpdatingStatus ? "cursor-not-allowed opacity-50" : ""
                          }`}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Rest of the item JSX */}
              <div className="flex-1 text-center">
                {/* <Link
                href={`/applicationjob/${item._id}`}
                className="text-[13px] text-[#0B5CFF] underline hover:underline"
              >
                New {item.applicants}
              </Link> */}
              </div>

              <div className="flex-1 text-center">
                <Link
                  href={`/applicationjob/${item._id}`}
                  className="text-[13px] text-[#0B5CFF] underline hover:underline"
                >
                  Applicant {item.applicants}
                </Link>
              </div>

              <div className="ml-6">
                <button className="p-1 text-gray-500 hover:text-black">
                  <FiMoreVertical size={25} className="rounded-md bg-[#F2F2F2] p-1 text-[#000]" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-[400px] w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              {/* No data illustration */}
              <svg
                className="mb-4 h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 48 48"
              >
                <path
                  d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M24 12v12M24 32h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="mb-2 text-lg font-semibold text-gray-700">
                {searchQuery ? "No jobs found" : "No jobs available"}
              </h3>
              <p className="text-sm text-gray-500">
                {searchQuery
                  ? `No jobs found matching "${searchQuery}". Try a different search term.`
                  : "There are no job applications available at the moment."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
