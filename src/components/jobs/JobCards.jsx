import Card from "@/common/card/Card";
import Image from "next/image";
import React from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";

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

const JobCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
      {jobList.map((job, index) => (
        <Card
          key={index}
          className="w-full  md:w-full
          border border-grayBlueText/20
          hover:bg-green-50 hover:border-primary transition-all duration-200"
        >
          <div className="w-full text-left py-2 px-2.5">
            <h3 className="font-bold text-base text-black tracking-normal md:max-w-[99px] mb-1.5">
              {job.title}
            </h3>
            <p className="text-sm text-grayBlueText gap-2 flex items-center mb-2">
              <IoClipboardOutline className="w-3.5 h-3.5" />
              {job.experience}
            </p>
            <p className="text-sm text-grayBlueText gap-2 flex items-center mb-2">
              <HiOutlineLocationMarker className="w-3.5 h-3.5" />
              {job.location}
            </p>
            <p className="text-[10px] font-normal text-grayBlueText mt-1">
              posted {job.posted}
            </p>
          </div>

          <div className="w-full gap-2 border-t border-black/10 flex items-center px-3 py-1.5">
            <Image
              src={job.logo}
              alt={job.company}
              width={24}
              height={24}
              className="rounded-full border border-gray-400 h-6 w-6 object-cover"
            />
            <div className="flex flex-col text-left">
              <h2 className="text-black font-normal text-xs">{job.company}</h2>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lightBlue font-normal text-xs"
              >
                {job.url}
              </a>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default JobCards;
