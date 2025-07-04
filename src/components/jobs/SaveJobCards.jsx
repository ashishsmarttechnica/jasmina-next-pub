"use client";
import Card from "@/common/card/Card";
import useGetJobs from "@/hooks/job/useGetJobs";
import useGetSavedJobs from "@/hooks/job/useGetSavedJobs";
import useJobStore from "@/store/job.store";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import ImageFallback from "../../common/shared/ImageFallback";
import { getRelativeTime } from "../../utils/dateUtils";
import SingleSaveJobDetail from "./SingleSaveJobDetail";
import { useTranslations } from "next-intl";

const SaveJobCards = ({ filters, isSavedJobs = false }) => {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const t = useTranslations("Jobs");
  const isDefaultFilters = !filters.search && !filters.location && filters.lgbtq === true;
  const { jobs, isLoading, error, getSavedJob } = useJobStore();
  const [selectedJob, setSelectedJob] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  console.log(jobs, "dfgfdgjobsss");

  // Calculate params for useGetJobs hook
  const jobParams = isDefaultFilters ? { limit: 1000 } : { ...filters, limit: 1000 };

  // Use different hooks based on the type of job listing
  if (isSavedJobs) {
    // For saved jobs page
    useGetSavedJobs();
  } else {
    // For regular jobs page
    useGetJobs(jobParams);
  }

  // If jobId is present in the URL, fetch that specific job
  useEffect(() => {
    if (jobId) {
      getSavedJob({
        id: jobId,
        onSuccess: (res) => {
          console.log(t("SavedJobFetched"));
        },
        onError: (error) => {
          console.error(t("Errorfetchingsavedjob"), error);
        },
      });
    }
  }, [jobId, getSavedJob]);

  // When jobs are filtered, if the selected job is not in the new list, clear the selection.
  useEffect(() => {
    if (selectedJob && !jobs.some((job) => job._id === selectedJob._id)) {
      setSelectedJob(null);
    }
  }, [jobs, selectedJob]);

  // Map API job data to UI job shape
  const mappedJobs = jobs.map((job) => ({
    _id: job._id,
    savedId: job.savedId || null,
    title: job.jobTitle || job.title || "-",
    experience: job.experience ? `${job.experience} ${t("years")}` : "-",
    location: job.jobLocation || job.location || "-",
    tag: job.company?.isLGBTQFriendly ? t("lgbtqFriendly") : "",
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
    website: job?.company?.website,
    posted: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-",
    _raw: job,
  }));

  // Auto-select the first job by default when jobs are loaded or changed
  useEffect(() => {
    if (mappedJobs.length > 0 && !selectedJob) {
      setSelectedJob(mappedJobs[0]);
    }
  }, [mappedJobs, selectedJob]);

  // If jobId is provided, auto-select that job
  useEffect(() => {
    if (jobId && mappedJobs.length > 0) {
      const job = mappedJobs.find((job) => job._id === jobId);
      if (job) {
        setSelectedJob(job);
      }
    }
  }, [jobId, mappedJobs]);

  if (isLoading) return <div>{t("Loadingjobs")}</div>;
  if (error) return <div>{t("Errorloadingjobs")}</div>;
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="w-full md:w-[35%]">
        <div className="flex flex-col gap-4">
          {mappedJobs.length > 0 ? (
            mappedJobs.slice(0, visibleCount).map((job) => (
              <Card
                key={job.savedId || job._id}
                className={`w-full cursor-pointer border transition-all duration-200 hover:border-green-700 hover:bg-green-50 ${selectedJob?._id === job._id ? "border-green-700 bg-green-700" : "border-gray-300"
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
                    <p>{t("Posted")} {getRelativeTime(job.posted)}</p>
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
                        {job.company || (t("unknownCompany"))}
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
            ))
          ) : (
            <div>{t("NoSavedjobsfound")}</div>
          )}

          {visibleCount < mappedJobs.length && (
            <button
              className="mt-2 rounded bg-green-700 px-4 py-2 text-white hover:bg-green-800"
              onClick={() => setVisibleCount((prev) => prev + 3)}
            >
              {t("loadMore")}
            </button>
          )}
        </div>
      </div>
      {/* Right Column: Job Detail */}
      {selectedJob && (
        <div className="w-full md:w-[65%]">
          <div className="sticky top-12 px-2">
            <SingleSaveJobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveJobCards;
