"use client";
import Card from "@/common/card/Card";
// import AppliedJobsPageSkeleton from "@/common/skeleton/AppliedJobsPageSkeleton";
import useGetAppliedJobs from "@/hooks/job/useGetAppliedJobs";
import useAppliedJobStore from "@/store/appliedJob.store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import JobsLayout from "../../layout/JobsLayout";
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
            <div>Loading applied jobs...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            <div className="flex flex-col gap-4 md:flex-row">
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
                      <div className="flex items-center justify-between">
                        <div className="relative h-12 w-12 overflow-hidden rounded-full">
                          <Image src={job.logo} alt={job.company} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                            {job.status}
                          </span>
                          {job.tag && (
                            <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                              {job.tag}
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-500">{job.company}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <HiOutlineLocationMarker className="mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <IoClipboardOutline className="mr-1" />
                          {job.type}
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        Applied on: {job.appliedDate}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1">
                        {job.requiredSkills.slice(0, 3).map((skill, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.requiredSkills.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{job.requiredSkills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
                {visibleCount < mappedJobs.length && (
                  <button
                    className="mt-2 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
                    onClick={() => setVisibleCount((prev) => prev + 3)}
                  >
                    Load More
                  </button>
                )}

                {pagination.totalPages > 1 && (
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-2">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            className={`rounded px-3 py-1 ${
                              pagination.currentPage === page
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
                )}
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
