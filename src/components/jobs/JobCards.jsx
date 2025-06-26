"use client";
import Card from "@/common/card/Card";
import useGetJobs from "@/hooks/job/useGetJobs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import SingleJobDetail from "./SingleJobDetail";

const JobCards = ({ filters }) => {
  const isDefaultFilters = !filters.search && !filters.location && filters.lgbtq === true;

  // Pass a large limit to fetch all records
  const searchParams = isDefaultFilters
    ? { limit: 1000 } // Large limit to get all records
    : { ...filters, limit: 1000 }; // Include filters with large limit

  const { data, isLoading, error } = useGetJobs(searchParams);
  const jobs = data?.jobs || [];
  const pagination = data?.pagination || {};
  const isLastPage = data?.isLastPage || false;

  const [selectedJob, setSelectedJob] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);

  // When jobs are filtered, if the selected job is not in the new list, clear the selection.
  useEffect(() => {
    if (selectedJob && !jobs.some((job) => job._id === selectedJob._id)) {
      setSelectedJob(null);
    }
  }, [jobs, selectedJob]);

  // Map API job data to UI job shape
  const mappedJobs = jobs.map((job) => ({
    _id: job._id,
    title: job.jobTitle || job.title || "-",
    experience: job.experience ? `${job.experience} years` : "-",
    location: job.jobLocation || job.location || "-",
    tag: job.company?.isLGBTQFriendly ? "LGBTQ Friendly" : "",
    skills: job.requiredSkills || [],
    company: job.company?.companyName || "-",
    url: job.company?.website || "",
    logo: job.company?.logoUrl
      ? job.company.logoUrl.startsWith("http")
        ? job.company.logoUrl
        : `${process.env.NEXT_PUBLIC_API_URL}/${job.company.logoUrl}`
      : "https://logo.clearbit.com/placeholder.com",
    type: job.employeeType || job.type || "-",
    genderPrefereance: job.genderPrefereance || "-",
    education: job.education || "-",
    salary: job.salaryRange || job.salary || "-",
    seniority: job.seniorityLevel || job.seniority || "-",
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
    requiredSkills: job.requiredSkills
      ? Array.isArray(job.requiredSkills)
        ? job.requiredSkills
        : job.requiredSkills.split(",")
      : [],
    posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-",
    _raw: job,
  }));
  //
  // Auto-select the first job by default when jobs are loaded or changed
  useEffect(() => {
    if (mappedJobs.length > 0 && !selectedJob) {
      setSelectedJob(mappedJobs[0]);
    }
  }, [mappedJobs, selectedJob]);

  if (isLoading) return <div>Loading jobs...</div>;
  if (error) return <div>Error loading jobs.</div>;

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      <div className="w-full pr-2 md:w-[35%]">
        <div className="flex flex-col gap-4">
          {mappedJobs.length > 0 ? (
            mappedJobs.slice(0, visibleCount).map((job, index) => (
              <Card
                key={`${job._id}-${index}`}
                className={`w-full cursor-pointer border transition-all duration-200 hover:border-green-700 hover:bg-green-50 ${
                  selectedJob?._id === job._id ? "border-green-700 bg-green-200" : "border-gray-300"
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
                  <div className="mb-2 flex gap-3 text-sm text-[#888DA8]">
                    {job?.genderPrefereance}
                  </div>
                  <div className="mt-3 flex items-center gap-2 border-t pt-3">
                    <Image
                      src={job.logo}
                      alt={`logo`}
                      width={28}
                      height={28}
                      className="rounded-md"
                    />
                    <span className="text-sm text-gray-500">{job.company}</span>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div>Waiting for jobs...</div>
          )}

          {visibleCount < mappedJobs.length && (
            <button
              className="mt-2 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
              onClick={() => setVisibleCount((prev) => prev + 3)}
            >
              Load More
            </button>
          )}
        </div>
      </div>
      {/* Right Column: Job Detail */}
      {selectedJob && (
        <div className="w-full md:w-[65%]">
          <div className="sticky top-12 px-2">
            <SingleJobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCards;
