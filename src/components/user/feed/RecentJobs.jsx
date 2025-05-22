"use client";
import React, { use } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { IoClipboardOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import CardHeading from "@/common/card/CardHeading";
import Image from "next/image";
import { useTranslations } from "next-intl";

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
  const t=useTranslations('UserFeedPost')
  return (
    <div className=" cust-card ">
      <div className="flex justify-between items-center  ">
        <CardHeading title={t('recentjob')} />
      </div>

      <div className="p-5 mx-auto  overflow-hidden ">
        <Swiper spaceBetween={10} slidesPerView="auto" className="h-full">
          {jobList.map((job, index) => (
            <SwiperSlide key={index} className="!w-auto ">
              <div className="px-0 h-auto w-auto  border overflow-hidden border-grayBlueText/50 rounded-md shadow-sm min-w-[172px]">
                <div className="block   text-left  p-2.5 bg-white  justify-between hover:shadow transition-all">
                  <h3 className="font-bold text-base text-black tracking-normal leading-[21px] max-w-[99px] mb-2.5">
                    {job.title}
                  </h3>
                  <p className="text-sm text-grayBlueText gap-2 flex items-center mb-2.5">
                    <IoClipboardOutline className="w-4 h-4" />
                    {job.experience}
                  </p>
                  <p className="text-sm text-grayBlueText gap-2 flex items-center mb-4">
                    <HiOutlineLocationMarker className="w-4 h-4" />
                    {job.location}
                  </p>
                  <p className="text-xs font-normal text-grayBlueText mt-3">
                    {t('posted')} {job.posted}
                  </p>
                </div>
                <div className=" flex items-center gap-1.5 border-t text-left border-black/10  p-2.5 ">
                  <Image
                    src={job.logo}
                    alt={job.company}
                    width={24}
                    height={24}
                    className="rounded-full border border-gray-400 h-6 w-6 object-cover"
                  />
                  <div className="flex flex-col ">
                    <h2 className="text-black font-medium text-xs">
                      {job.company}
                    </h2>
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#007BFF] text-xs"
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
