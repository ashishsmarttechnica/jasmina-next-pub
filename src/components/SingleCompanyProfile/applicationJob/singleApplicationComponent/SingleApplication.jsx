"use client";

import { getCompanyAppliedJob } from "@/api/company.api";
import { useAllApplicants } from "@/hooks/company/singleCompany/useSingleApplicationaplicant";
import SetInterviewModal from "@/modal/SetInterviewModal";
import useSingleCompanyAppliedJobStore from "@/store/singleCopanyAppliedJob.store";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "../../applications/SearchBar";
import ApplicantDetails from "./ApplicantDetails";
import ApplicantList from "./ApplicantList";
import JobHeader from "./JobHeader";

const SingleApplication = () => {
  const params = useParams();

  // Get the selected job from the store
  const selectedJobFromStore = useSingleCompanyAppliedJobStore((state) => state.selectedJob);
  const setSelectedJob = useSingleCompanyAppliedJobStore((state) => state.setSelectedJob);

  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [isSetInterviewOpen, setIsSetInterviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [jobData, setJobData] = useState(null);
  const [isJobLoading, setIsJobLoading] = useState(false);
  const t = useTranslations("Applications");

  // Fetch job details if not available in store
  useEffect(() => {
    const fetchJobDetails = async () => {
      // If we have job data in store, use it
      if (selectedJobFromStore && selectedJobFromStore._id) {
        setJobData(selectedJobFromStore);
        return;
      }

      // If no job in store but we have job ID in URL params, fetch it
      const jobIdFromParams = params?.subid;
      if (jobIdFromParams && !selectedJobFromStore) {
        setIsJobLoading(true);
        try {
          const response = await getCompanyAppliedJob(jobIdFromParams, "", "", 1, 1);

          if (response.success && response.data.jobs && response.data.jobs.length > 0) {
            const jobDetails = response.data.jobs[0];
            setJobData(jobDetails);
            setSelectedJob(jobDetails); // Save to store for persistence
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
        } finally {
          setIsJobLoading(false);
        }
      } else if (selectedJobFromStore) {
        // If we have some job data in store, use it
        setJobData(selectedJobFromStore);
      }
    };

    fetchJobDetails();
  }, [selectedJobFromStore, params?.subid, setSelectedJob]);

  useEffect(() => {
    if (selectedJobFromStore) {
      setSelectedApplicant(null);
    }
  }, [selectedJobFromStore]);

  // Get job ID from job data or URL params
  const jobId = jobData?._id || params?.subid;

  // Fetch applicants data using our custom hook
  const {
    data: applicantsData,
    isLoading,
    isError,
    error,
  } = useAllApplicants(
    jobId, // Job ID from selected job or URL
    page, // Current page
    10, // Limit per page
    activeTab // Status filter
  );

  // Get applicants from the fetched data or use empty array if loading/error
  const applicants = applicantsData?.newApplicants || [];
  const isLastPage = applicantsData?.isLastPage || false;
  const pagination = applicantsData?.pagination || { total: 0 };

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

  const handleStatusChange = (newStatus) => {
    // Update the selected applicant's status immediately
    if (selectedApplicant) {
      setSelectedApplicant({
        ...selectedApplicant,
        status: newStatus,
        originalData: {
          ...selectedApplicant.originalData,
          status: newStatus,
        },
      });
    }
  };

  // Handle loading and error states for job data
  if (isJobLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">{t("singleApplication.loadingJob")}</h3>
        </div>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="flex justify-center p-10">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-700">{t("singleApplication.noJobSelectedTitle")}</h3>
          <p className="text-sm text-gray-500">{t("singleApplication.noJobSelectedDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Search and Post Job */}
      <div className="flex">
        <div className="mb-2 flex w-[720px] items-center justify-between rounded-lg bg-white p-2 shadow-md sm:mb-0">
          <div className="flex w-full items-center justify-between">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Job Header */}
      <JobHeader jobData={jobData} />

      {/* Filter Tabs */}
      {/* <FilterTabs activeTab={activeTab} setActiveTab={handleTabChange} /> */}

      {/* Applicant Count */}
      <div className="mb-4 text-sm text-gray-500">{t("singleApplication.totalApplicants", { count: pagination.total || 0 })}</div>

      {isLoading && page === 1 ? (
        <div className="flex justify-center p-10">{t("singleApplication.loadingApplicants")}</div>
      ) : isError ? (
        <div className="flex justify-center p-10 text-red-500">
          {t("singleApplication.errorLoadingApplicants")}: {error?.message || t("singleApplication.unknownError")}
        </div>
      ) : applicants.length === 0 ? (
        <div className="flex justify-center p-10 text-gray-500">
          {t("singleApplication.noApplicantsForJob")}
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
                selectedApplicant={{
                  ...selectedApplicant,
                  jobId: jobId, // Explicitly pass the jobId
                }}
                applicants={applicantsData}
                setIsSetInterviewOpen={setIsSetInterviewOpen}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="hidden w-full rounded-lg bg-white p-6 text-center shadow-md lg:block lg:w-[60%]">
                {t("singleApplication.selectApplicantPlaceholder")}
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
                {isLoading ? t("loading") : t("loadMore")}
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
