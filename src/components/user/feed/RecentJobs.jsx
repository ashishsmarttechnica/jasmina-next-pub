"use client";
import CardHeading from "@/common/card/CardHeading";
import useGetResentJob from "@/hooks/job/useGetResentJob";
import useResentJobStore from "@/store/resentjob.store";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const jobList = [
  {
    title: "UI/UX Designer",
    experience: "4 years",
    location: "Berlin, Japan",
    posted: "1 day ago",
    company: "The Walt Disney",
    url: "www.disney.com",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    title: "Frontend Developer",
    experience: "3 years",
    location: "San Francisco, USA",
    posted: "2 days ago",
    company: "Google",
    url: "www.google.com",
    logo: "https://logo.clearbit.com/amazon.com",
  },
  {
    title: "Backend Engineer",
    experience: "5 years",
    location: "Remote",
    posted: "5 days ago",
    company: "Netflix",
    url: "www.netflix.com",
    logo: "https://logo.clearbit.com/amazon.com",
  },
];

const RecentJobs = () => {
  const t = useTranslations("UserFeedPost");
  const { data, isLoading, error } = useGetResentJob();
  const { resentJobs } = useResentJobStore();
  console.log(data, isLoading, error, "recent/job");

  return (
    <div className="cust-card">
      <div className="flex items-center justify-between">
        <CardHeading title={t("recentjob")} />
      </div>

      <div className="mx-auto overflow-hidden  p-5">
        <Swiper spaceBetween={10} slidesPerView="auto" className="h-full">
          {jobList.map((job, index) => (
            <SwiperSlide key={index} className="!w-auto z-5">
              <div className="border-grayBlueText/50 z-5 h-auto w-auto min-w-[172px] overflow-hidden rounded-md border px-0 shadow-sm">
                <div className="block justify-between bg-white p-2.5 text-left transition-all hover:shadow">
                  <h3 className="mb-2.5 max-w-[99px] text-base leading-[21px] font-bold tracking-normal text-black">
                    {job.title}
                  </h3>
                  <p className="text-grayBlueText mb-2.5 flex items-center gap-2 text-sm">
                    <IoClipboardOutline className="h-4 w-4" />
                    {job.experience}
                  </p>
                  <p className="text-grayBlueText mb-4 flex items-center gap-2 text-sm">
                    <HiOutlineLocationMarker className="h-4 w-4" />
                    {job.location}
                  </p>
                  <p className="text-grayBlueText mt-3 text-xs font-normal">
                    {t("posted")} {job.posted}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 border-t border-black/10 p-2.5 text-left">
                  <Image
                    src={job.logo}
                    alt={job.company}
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
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RecentJobs;
