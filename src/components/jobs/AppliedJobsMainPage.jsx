"use client";
import Card from "@/common/card/Card";
// import AppliedJobsPageSkeleton from "@/common/skeleton/AppliedJobsPageSkeleton";
import useGetAppliedJobs from "@/hooks/job/useGetAppliedJobs";
import useAppliedJobStore from "@/store/appliedJob.store";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import ImageFallback from "../../common/shared/ImageFallback";
import JobsLayout from "../../layout/JobsLayout";
import { getRelativeTime } from "../../utils/dateUtils";
import JobHeader from "./JobHeader";
import MyJobs from "./leftSidebar/MyJobs";
import SingleJobDetail from "./SingleJobDetail";

const AppliedJobsMainPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    lgbtq: true,
  });
  const [selectedJob, setSelectedJob] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  // Get applied jobs using the custom hook
  const { appliedJobs, isLoading, error, pagination } = useGetAppliedJobs(currentPage, 10);

  // Access getAppliedJobs directly for page changes
  const getAppliedJobs = useAppliedJobStore((state) => state.getAppliedJobs);
  const t = useTranslations("Jobs");
  // Handle page change
  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  // Map API job data to UI job shape
  const mappedJobs = appliedJobs.map((appliedJob) => {
    const job = appliedJob.jobId || {};

    return {
      _id: job._id || appliedJob._id,
      title: job.jobTitle || "-",
      experience: job.experience ? `${job.experience} years` : "-",
      location: job.jobLocation || "-",
      tag: job.genderPrefereance === "nonlgbtq" ? "" : "LGBTQ Friendly",
      skills: job.requiredSkills || [],
      company: "Company", // Need to add company name if available
      url: job.careerWebsite || "",
      logo: "https://logo.clearbit.com/placeholder.com", // Placeholder logo
      type: job.employeeType || "-",
      genderPrefereance: job.genderPrefereance || "-",
      education: job.education || "-",
      salary: job.salaryRange || "-",
      seniority: job.seniorityLevel || "-",
      applicants: job.applicants || 0,
      description: job.description?.replace(/<[^>]+>/g, "") || "-",
      responsibilities: job.responsibilities
        ? Array.isArray(job.responsibilities)
          ? job.responsibilities
          : job.responsibilities
              .replace(/<[^>]+>/g, "")
              .split("\n")
              .filter(Boolean)
        : [],
      requiredSkills: job.requiredSkills || [],
      posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-",
      appliedDate: appliedJob.createdAt ? new Date(appliedJob.createdAt).toLocaleDateString() : "-",
      status: appliedJob.seen ? "Seen" : "Not seen",
      website: job?.company?.website,
      _raw: { ...job, application: appliedJob },
    };
  });

  // Auto-select the first job by default when jobs are loaded or changed
  useEffect(() => {
    if (mappedJobs.length > 0 && !selectedJob) {
      setSelectedJob(mappedJobs[0]);
    }
  }, [mappedJobs, selectedJob]);

  return (
    <JobsLayout leftComponents={[<MyJobs key="left1" />]}>
      <div className="w-full">
        <JobHeader filters={filters} setFilters={setFilters} showSaveJobsLink={false} />
        <div className="mt-4 flex flex-col gap-4">
          {isLoading ? (
            <div>{t("Loadingappliedjobs")}</div>
          ) : error ? (
            <div>
              {t("Error")}: {error}
            </div>
          ) : (
            <div className="flex w-full flex-col md:flex-row">
              {/* Left Column: Job List */}
              <div className="w-full md:w-[35%]">
                {/* <h2 className="mb-3 font-medium">
                  Your Applied Jobs ({pagination.total || mappedJobs.length})
                </h2> */}
                {mappedJobs.slice(0, visibleCount).map((job) => (
                  <Card
                    key={job._id}
                    className={`mb-3 transform cursor-pointer transition duration-200 ${
                      selectedJob?._id === job._id
                        ? "border-primary border-1"
                        : "hover:scale-[1.01]"
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">{job.title}</h3>
                      <p className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <IoClipboardOutline className="h-4 w-4" />
                        {job.experience}
                      </p>
                      <p className="mb-1 flex items-center gap-2 text-sm text-gray-600">
                        <HiOutlineLocationMarker className="h-4 w-4" />
                        {job.location}
                      </p>
                      <div className="mb-2 flex gap-3 text-sm text-[#888DA8]">{job?.createdAt}</div>
                      <div className="mb-2 flex gap-3 text-sm text-[#888DA8]">
                        <p>Posted {getRelativeTime(job.posted)}</p>
                      </div>
                      {/* <div>{job?.createdAt}</div> */}

                      <div className="mt-3 flex items-start gap-2 border-t border-slate-200 pt-3">
                        <ImageFallback
                          src={job.company.logoUrl} // assuming it's `logoUrl`, update if needed
                          alt="logo"
                          width={28}
                          height={28}
                          className="mt-1 rounded-md"
                        />

                        <div className="flex w-full flex-col">
                          <div className="text-sm text-gray-500">
                            {job.company || "Unknown Company"}
                          </div>
                          {/* {job.socialLinks && ( */}
                          <div className="w-full max-w-full text-[13px] break-all whitespace-normal text-[#007BFF]">
                            {job.website}
                          </div>
                          {/* )} */}
                        </div>
                      </div>
                      {/**/}
                    </div>
                  </Card>
                ))}
                {visibleCount < mappedJobs.length && (
                  <button
                    className="mt-2 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                  >
                    {t("loadMore")}
                  </button>
                )}
                {visibleCount >= mappedJobs.length && mappedJobs.length > 0 && (
                  <div className="mt-2 text-center text-gray-500">
                    <p>{t("noMoreJobsToLoad")}</p>
                  </div>
                )}
                {/* {pagination.totalPages > 1 && (
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-2">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            className={`rounded px-3 py-1 ${pagination.currentPage === page
                                ? "bg-green-700 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )} */}
              </div>
              {/* Right Column: Job Detail */}
              {selectedJob && (
                <div className="w-full md:w-[65%]">
                  <div className="sticky top-12 px-2">
                    <SingleJobDetail
                      job={selectedJob}
                      onBack={() => setSelectedJob(null)}
                      hideApplyButton={true}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </JobsLayout>
  );
};

export default AppliedJobsMainPage;
