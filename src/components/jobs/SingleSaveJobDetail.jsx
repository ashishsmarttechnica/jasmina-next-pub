"use client";
import BookEducation from "@/assets/svg/jobs/BookEducation";
import ClockSvg from "@/assets/svg/jobs/ClockSvg";
import Dollar from "@/assets/svg/jobs/Dollar";
import Experience from "@/assets/svg/jobs/Experience";
import Graph from "@/assets/svg/jobs/Graph";
import PeopleSvg from "@/assets/svg/jobs/PeopleSvg";
import { useRouter } from "@/i18n/navigation";
import useJobStore from "@/store/job.store";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa6";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import { LuBookmark } from "react-icons/lu";
import { toast } from "react-toastify";
import { removeJob } from "../../api/job.api";
import Bar from "../../assets/svg/jobs/Bar";
import Colors from "../../assets/svg/jobs/colors";
import ImageFallback from "../../common/shared/ImageFallback";
import { useTranslations } from "next-intl";

const SingleSaveJobDetail = ({ job, onBack }) => {
  // if (!job) return <div>Loading job details...</div>;
  // console.log(job, "job");
  const t = useTranslations("Jobs");
  const [bookmarked, setBookmarked] = useState(true); // Default to true since this is for saved jobs
  const saveJob = useJobStore((s) => s.saveJob);
  const savedJobs = useJobStore((s) => s.savedJobs);
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

  const toggleBookmark = () => {
    const userId = Cookies.get("userId");
    if (!userId) {
       toast.error(t('Usernotloggedin'));
      return;
    }

    if (bookmarked) {
      // 🔁 Call removeJob API
      removeJob({ jobId: job?._id, userId })
        .then(() => {
          toast.success(t('Jobremoved'));
          setBookmarked(false);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || t('Failedtosavejob'));
        });
    } else {
      // Save the job only if not already bookmarked
      saveJob({
        jobId: job?._id,
        userId,
        onSuccess: () => {
         toast.success(t('Jobsaved'));
          setBookmarked(true);
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || t('Failedtosavejob'));
        },
      });
    }
  };

  const handleApplyNow = () => {
    // const locale = window.location.pathname.split("/")[1];
    router.push(`/jobs/apply-now/${job?._id}/${job?.title}`);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border  mt-5 md:mt-0 border-gray-200 bg-white p-5 shadow-sm">
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
            <FaBookmark className="text-xl text-[#888DA8]" />
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

      <button
        className="mt-3 rounded bg-green-700 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-800"
        onClick={handleApplyNow}
      >
        {t('ApplyNow')}
      </button>

      <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-gray-700">
        <h4 className="mb-2 font-medium">Quick Info Section</h4>
        <ul className="space-y-2 text-sm text-[#888DA8]">
          <li className="flex items-center gap-2">
            <ClockSvg />
            {job?.type}
          </li>
          <li className="flex items-center gap-2">
            <Experience />
            {t('experience')}: {job?.experience}
          </li>
          <li className="flex items-center gap-2">
            <BookEducation />
            {t('Education')}: {job?.education}
          </li>
          <li className="flex items-center gap-2">
            <Dollar />
            {t('Salary')}: {job?.salary}
          </li>
          <li className="flex items-center gap-2">
            <Graph />
            {t('Seniority')}: {job?.seniority}
          </li>
          <li className="flex items-center gap-2">
            <PeopleSvg />
            {t('Applicants')}: {job?.applicants}
          </li>
        </ul>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-3 text-sm text-[#888DA8]">
        <h4 className="mb-2 font-medium text-black">{t('JobDescription')}</h4>
        <div className="max-w-sm" dangerouslySetInnerHTML={{ __html: job?.description }} />
        <div
          className="mt-2 max-w-md"
          dangerouslySetInnerHTML={{ __html: job?.responsibilities }}
        />
        <div className="mt-4 border-t border-slate-100 pt-3">
          <h4 className="mb-2 font-medium text-black">{t('JobResponsibilities')}</h4>
          <div className="max-w-sm" dangerouslySetInnerHTML={{ __html: job?.responsibilities }} />
        </div>
        <div className="mt-4 border-t border-slate-100 pt-3">
          <h4 className="mb-2 font-medium text-black">{t('JobRequirements')}</h4>
          <ul className="mt-2 grid max-w-md list-disc grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {Array.isArray(job?.requiredSkills) &&
              job.requiredSkills.map((skill, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-full rounded-lg bg-[#EAEAEA] px-3 py-2 text-center text-xs text-[13px] font-medium text-black shadow-sm transition-colors duration-200 hover:bg-green-100">
                    {skill}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleSaveJobDetail;
