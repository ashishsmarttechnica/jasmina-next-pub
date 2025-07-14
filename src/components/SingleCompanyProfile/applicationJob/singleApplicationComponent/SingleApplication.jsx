"use client";

import { useAllApplicants } from "@/hooks/company/singleCompany/useSingleApplicationaplicant";
import SetInterviewModal from "@/modal/SetInterviewModal";
import useSingleCompanyAppliedJobStore from "@/store/singleCopanyAppliedJob.store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../../applications/SearchBar";
import ApplicantDetails from "./ApplicantDetails";
import ApplicantList from "./ApplicantList";
import FilterTabs from "./FilterTabs";
import JobHeader from "./JobHeader";

const SingleApplication = () => {
  const params = useParams();
  const selectedJobFromStore = useSingleCompanyAppliedJobStore((state) => state.selectedJob);

  const [jobData, setJobData] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isSetInterviewOpen, setIsSetInterviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);

  // Set job data from store when it changes
  useEffect(() => {
    if (selectedJobFromStore) {
      setJobData(selectedJobFromStore);
    }
  }, [selectedJobFromStore]);

  // Get job ID from either parsed data or URL params
  const jobId = jobData?.id || jobData?._id || params?.subid;

  // Fetch applicants data using our custom hook
  const {
    data: applicantsData,
    isLoading,
    isError,
    error,
  } = useAllApplicants(
    jobId, // Job ID from parsed data or URL
    page, // Current page
    10, // Limit per page
    activeTab // Status filter
  );
  console.log("Raw applicants data:", applicantsData);
  console.log("Current jobId:", jobId);

  // Get applicants from the fetched data or use empty array if loading/error
  const applicants = applicantsData?.newApplicants || [];
  const isLastPage = applicantsData?.isLastPage || false;
  const pagination = applicantsData?.pagination || { total: 0 };

  console.log("Processed applicants:", applicants);
  console.log("Pagination:", pagination);

  useEffect(() => {
    if (applicants.length > 0 && !selectedApplicant) {
      // Auto-select first applicant when data loads
      setSelectedApplicant(applicants[0]);
    }
  }, [applicants]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // Reset to first page when changing tabs
  };

  // Handle loading more applicants
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleApplicantClick = (applicant) => {
    setSelectedApplicant(applicant);
  };
  console.log("jobData", jobData);
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
      <JobHeader jobData={jobData} />

      {/* Filter Tabs */}
      <FilterTabs activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Applicant Count */}
      <div className="mb-4 text-sm text-gray-500">Total Applicants: {pagination.total || 0}</div>

      {isLoading && page === 1 ? (
        <div className="flex justify-center p-10">Loading applicants...</div>
      ) : isError ? (
        <div className="flex justify-center p-10 text-red-500">
          Error loading applicants: {error?.message || "Unknown error"}
        </div>
      ) : applicants.length === 0 ? (
        <div className="flex justify-center p-10 text-gray-500">
          No applicants found for this job
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Applicants List */}
            <ApplicantList
              applicants={applicants}
              selectedApplicant={selectedApplicant}
              handleApplicantClick={handleApplicantClick}
            />

            {/* Selected Applicant Details */}
            {selectedApplicant ? (
              <ApplicantDetails
                selectedApplicant={selectedApplicant}
                setIsSetInterviewOpen={setIsSetInterviewOpen}
              />
            ) : (
              <div className="hidden w-full rounded-lg bg-white p-6 text-center shadow-md lg:block lg:w-[60%]">
                Select an applicant to view details
              </div>
            )}
          </div>

          {/* Load More Button */}
          {!isLastPage && applicants.length > 0 && (
            <div className="mt-4 flex justify-center">
              <button
                className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </>
      )}

      <SetInterviewModal
        isOpen={isSetInterviewOpen}
        onClose={() => setIsSetInterviewOpen(false)}
        jobId={jobId}
        candidateData={selectedApplicant}
      />
    </div>
  );
};

export default SingleApplication;
