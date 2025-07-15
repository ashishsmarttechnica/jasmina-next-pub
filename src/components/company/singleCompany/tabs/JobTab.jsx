import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";
import useResentJobStore from "@/store/resentjob.store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import useSingleCompanyAppliedJob from "../../../../hooks/company/singleCompany/useSingleCompanyAppliedJob";
const JobTab = () => {
  const t= useTranslations("CompanyProfile.singleCompanyTab");
  const router = useRouter();
  // const { data, isLoading, error } = useGetResentJob();
  const { resentJobs } = useResentJobStore();
  // console.log(data, isLoading, error, "recent/job");
  const params = useParams();
  // const { data: userData, isLoading, error } = useSingleCompany(userId);

  const {
    data: getCompanyAppliedJob,
    isLoading: isGetCompanyAppliedJobLoading,
    isError: isGetCompanyAppliedJobError,
    error: getCompanyAppliedJobError,
  } = useSingleCompanyAppliedJob(params.id);
  const jobListings = getCompanyAppliedJob;
  const { user } = useAuthStore();
  
  const handleApplyNow = () => {
    // const locale = window.location.pathname.split("/")[1];
    router.push(`/jobs/apply-now/${jobListings?._id}/${jobListings?.jobTitle}`);
  };

  return (
    <div className="cust-card">

{/* */}
      <div className="mx-auto overflow-hidden  p-6">
        {isGetCompanyAppliedJobLoading ? (
          <div className="text-center text-gray-500 py-10">Loading jobs...</div>
        ) : isGetCompanyAppliedJobError ? (
          <div className="text-center text-slate-500 py-10">{getCompanyAppliedJobError?.message || "Failed to load jobs."}</div>
        ) : Array.isArray(jobListings) && jobListings.length > 0 ? (
          <Swiper spaceBetween={20} slidesPerView="auto" className="h-full">
            {jobListings.map((job, index) => (
              <SwiperSlide key={index} className="!w-auto z-5">
                <div className="border-grayBlueText/50 z-5 h-[199px] w-[180px] min-w-[180px] overflow-hidden rounded-md border px-0 shadow-sm flex flex-col justify-between">
                  <div className="block bg-white p-2.5 text-left transition-all hover:shadow">
                    <h3 className="mb-2 max-w-full text-base leading-[21px] font-bold tracking-normal text-black line-clamp-2 h-[42px]">
                      {job.jobTitle}
                    </h3>
                    <p className="text-grayBlueText flex items-center gap-2 text-sm">
                      <IoClipboardOutline className="h-4 w-4" />
                      {job.experience || job.seniorityLevel} year
                    </p>
                    <p className="text-grayBlueText mb-4 flex items-center gap-2 text-sm h-[20px] truncate whitespace-nowrap max-w-[130px]">
                      <HiOutlineLocationMarker className="h-4 w-4" />
                      {(() => {
                        const words = (job.jobLocation || '').split(' ');
                        return words.length > 16
                          ? words.slice(0, 16).join(' ') + '...'
                          : job.jobLocation;
                      })()}
                    </p>
                    <p className="text-grayBlueText mt-3 text-xs font-normal">
                      posted {job.createdAt && new Date(job.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {/* Conditional rendering for Apply Now or Company Info */}
                  {user?.role === "user" ? (
                    <div className="flex items-center gap-1.5 border-t border-black/10 p-2.5 text-left">
                      <a
                        // href={job.careerWebsite || "#"}
                        onClick={handleApplyNow}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary rounded px-4 py-1 text-center text-white"
                      >
                        Apply Now
                      </a>
                    </div>
                  ) : user?.role === "company" ? (
                    <div className="flex items-center gap-1.5 border-t border-black/10 p-2.5 text-left">
                      <Image
                        src={job?.logo}
                        alt={job?.company || "company"}
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full border border-gray-400 object-cover"
                      />
                      <div className="flex flex-col">
                        <h2 className="text-xs font-medium text-black">{job.company}</h2>
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#007BFF]"
                        >
                          {job.url}
                        </a>
                      </div>
                    </div>
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500 py-10">No jobs found for this company.</div>
        )}
      </div>
    </div>
  );
};

export default JobTab;
