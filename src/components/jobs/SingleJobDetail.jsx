"use client";
import BookEducation from "@/assets/svg/jobs/BookEducation";
import ClockSvg from "@/assets/svg/jobs/ClockSvg";
import Dollar from "@/assets/svg/jobs/Dollar";
import Experience from "@/assets/svg/jobs/Experience";
import Graph from "@/assets/svg/jobs/Graph";
import PeopleSvg from "@/assets/svg/jobs/PeopleSvg";
import useAppliedJobStore from "@/store/appliedJob.store";
import useJobStore from "@/store/job.store";
import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import { LuBookmark } from "react-icons/lu";
import { MdBookmark } from "react-icons/md";
import { toast } from "react-toastify";
import { removeJob } from "../../api/job.api";
import Bar from "../../assets/svg/jobs/Bar";
import Colors from "../../assets/svg/jobs/colors";
import ImageFallback from "../../common/shared/ImageFallback";
//

const SingleJobDetail = ({ job, onBack, hideApplyButton }) => {
  // if (!job) return <div>Loading job details...</div>;
  console.log(job, "job");
  const [bookmarked, setBookmarked] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const saveJob = useJobStore((s) => s.saveJob);
  const t = useTranslations("Jobs");
  const savedJobs = useJobStore((s) => s.savedJobs);
  const appliedJobs = useAppliedJobStore((s) => s.appliedJobs);
  const router = useRouter();
  // Check if this job is already saved when component mounts or job changes
  useEffect(() => {
    if (job && savedJobs && Array.isArray(savedJobs)) {
      const isAlreadySaved = savedJobs.some(
        (savedJob) =>
          savedJob.jobId === job._id ||
          savedJob._id === job._id ||
          (job.savedId && savedJob.savedId === job.savedId)
      );
      setBookmarked(isAlreadySaved);
    }
  }, [job, savedJobs]);

  // Check if user has already applied to this job
  useEffect(() => {
    if (job && appliedJobs && Array.isArray(appliedJobs)) {
      const isAlreadyApplied = appliedJobs.some(
        (appliedJob) => appliedJob.jobId?._id === job._id || appliedJob.jobId === job._id
      );
      setHasApplied(isAlreadyApplied);
    }
  }, [job, appliedJobs]);

  const toggleBookmark = () => {
    const userId = Cookies.get("userId");
    if (!userId) {
      toast.error(t("loginToBookmark"));
      return;
    }

    if (bookmarked) {
      // 🔁 Call removeJob API
      removeJob({ jobId: job?._id, userId })
        .then(() => {
          toast.success(t("jobRemoved"));
          setBookmarked(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || t("failedToRemoveJob"));
        });
    } else {
      // Save the job only if not already bookmarked
      saveJob({
        jobId: job?._id,
        userId,
        onSuccess: () => {
          toast.success(t("jobSaved"));
          setBookmarked(true);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || t("failedToSaveJob"));
        },
      });
    }
  };

  const handleApplyNow = () => {
    router.push(`/jobs/apply-now/${job?._id}/${job?.title}`);
  };

  return (
    <div className="mt-5 w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-5 md:mt-0">
      {/* <button
        className="text-sm text-blue-600 underline mb-3"
        onClick={onBack}
      >
        ← Back to job list
      </button> */}

      <h3 className="mb-2 flex justify-between text-lg font-semibold text-black">
        {job?.title}
        <span onClick={toggleBookmark} className="cursor-pointer">
          {bookmarked ? (
            <MdBookmark className="text-xl text-[#888DA8]" />
          ) : (
            <LuBookmark className="text-xl text-[#888DA8]" />
          )}
        </span>
      </h3>

      <div className="mb-2 flex gap-3 text-sm text-[#888DA8]">
        <IoClipboardOutline className="h-4 w-4" />
        {job?.experience}
      </div>
      <div className="mb-2 flex gap-3 text-sm text-[#888DA8]">
        <HiOutlineLocationMarker className="h-4 w-4" />
        {job?.location}
      </div>
      <div className="mb-2 flex gap-3 text-sm text-[#888DA8]">
        {/* <Colors width={13} height={13} /> */}
        <div className="mb-2 flex items-center gap-3 text-sm text-[#888DA8]">
          {job?.genderPrefereance === "lgbtq" && <Colors className="h-5 w-5" />}
          {job?.genderPrefereance === "nonlgbtq" && <Bar className="h-5 w-5" />}
          <span>{job?.genderPrefereance}</span>
        </div>
      </div>

      {!hideApplyButton && (
        <button
          className={`mt-3 rounded px-4 py-1.5 text-sm font-medium text-white ${
            hasApplied ? "cursor-not-allowed bg-gray-400" : "bg-green-700 hover:bg-green-800"
          }`}
          onClick={handleApplyNow}
          disabled={hasApplied}
        >
          {hasApplied ? t("alreadyApplied") : t("applyNow")}
        </button>
      )}

      <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-gray-700">
        <h4 className="mb-2 font-medium">{t("QuickInfoSection")}</h4>
        <ul className="space-y-2 text-sm text-[#888DA8]">
          <li className="flex items-center gap-2">
            <ClockSvg />
            {job?.type}
          </li>
          <li className="flex items-center gap-2">
            <Experience />
            {t("experience")}: {job?.experience}
          </li>
          <li className="flex items-center gap-2">
            <BookEducation />
            {t("Education")}: {job?.education}
          </li>
          <li className="flex items-center gap-2">
            <Dollar />
            {t("Salary")}: {job?.salary}
          </li>
          <li className="flex items-center gap-2">
            <Graph />
            {t("Seniority")}: {job?.seniority}
          </li>
          <li className="flex items-center gap-2">
            <PeopleSvg />
            {t("Applicants")}: {job?.applicants}
          </li>
        </ul>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-[#888DA8]">
        <h4 className="mb-2 font-medium text-black">{t("JobDescription")}</h4>
        <div
          className="indesc w-full max-w-full text-[13px] break-words whitespace-normal"
          dangerouslySetInnerHTML={{ __html: job?.description }}
        />
        <div
          className="indesc mt-2 w-full max-w-full text-[13px] break-words whitespace-normal"
          dangerouslySetInnerHTML={{ __html: job?.responsibilities }}
        />
        <div className="mt-4 border-t border-slate-100 pt-3">
          <h4 className="mb-2 font-medium text-black">{t("JobResponsibilities")}</h4>
          <div
            className="indesc w-full max-w-full text-[13px] break-words whitespace-normal"
            dangerouslySetInnerHTML={{ __html: job?.responsibilities }}
          />
        </div>
        <div className="mt-4 border-t border-slate-100 pt-3">
          <h4 className="mb-2 font-medium text-black">{t("JobRequirements")}</h4>
          <ul className="mt-2 grid max-w-full list-disc grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.isArray(job?.requiredSkills) &&
              job.requiredSkills.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-full max-w-full rounded-lg bg-[#EAEAEA] px-3 py-2 text-center text-xs text-[13px] font-medium break-words whitespace-normal text-black shadow-sm transition-colors duration-200 hover:bg-green-100">
                    {skill}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <div>
          <div className="mt-3 flex flex-col items-start gap-2 border-t border-slate-100 pt-3 sm:flex-row">
            <ImageFallback
              src={job.company.logoUrl}
              alt="logo"
              width={28}
              height={28}
              className="mt-1 rounded-md"
            />
            <div className="flex w-full flex-col">
              <div className="text-sm text-gray-500">
                {job.company?.companyName || "Unknown Company"}{" "}
              </div>
              <div className="w-full max-w-full text-[13px] break-words whitespace-normal">
                {job.website}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetail;
