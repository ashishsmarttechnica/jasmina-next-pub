"use client";
import React, { useState } from "react";
import microsoft from "@/assets/jobs/microsoft.png";
import { MdBookmark, MdOutlineAccessTime } from "react-icons/md";
import { LuBook, LuBookmark } from "react-icons/lu";
import { IoClipboardOutline } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useRouter } from "@/i18n/navigation";
import Experience from "@/assets/svg/jobs/Experience";
import Dollar from "@/assets/svg/jobs/Dollar";
import Graph from "@/assets/svg/jobs/Graph";
import PeopleSvg from "@/assets/svg/jobs/PeopleSvg";
import Colors from "@/assets/svg/jobs/colors";
import Image from "next/image";
import ClockSvg from "@/assets/svg/jobs/ClockSvg";
import BookEducation from "@/assets/svg/jobs/BookEducation";

const job = {
  title: "UI/UX Designer",
  experience: "4 years",
  location: "Berlin, Japan",
  tag: "LGBTQ Friendly",
  skills: [
    "Figma",
    "Adobe XD",
    "HTML/CSS",
    "Prototyping",
    "Design Systems",
    "User Research",
    "Wireframing",
  ],
  company: "The Walt Disney",
  url: "https://www.disney.com",
  logo: microsoft,
  type: "Full Time / Part Time",
  education: "Bachelor's in Design",
  salary: "₹6–10 LPA",
  seniority: "Mid-Level",
  applicants: 2,
  description:
    "We are looking for a creative and detail-oriented UI/UX Designer to join our team and shape the future of digital experiences in the entertainment industry. This role offers opportunities for innovation and creativity.",
  responsibilities: [
    "Design wireframes, prototypes, and high-fidelity UI.",
    "Collaborate with developers and stakeholders to implement designs.",
    "Conduct user testing and iterate on designs to improve user experience.",
    "Create and maintain design systems and guidelines.",
    "Lead design workshops and brainstorming sessions.",
  ],
  posted: "1 day ago",
};
const SingleJobDetail = () => {
  const [bookmarked, setBookmarked] = useState(false);
  const routing = useRouter();
  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };
  const handleApplyNow = () => {
    routing.push(`/jobs/apply-now/sd515778/ui-ux`);
  };

  return (
    <div className="w-full h-fit  bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="w-full text-left pt-3 p-4.5 space-y-2.5">
        <h3 className="flex justify-between font-medium text-[16px] text-black tracking-normal leading-[19px] ">
          {job.title}
          <span onClick={toggleBookmark} className="cursor-pointer">
            {bookmarked ? (
              <MdBookmark className="text-xl text-[#888DA8]  " />
            ) : (
              <LuBookmark className="text-xl text-[#888DA8]" />
            )}
          </span>
        </h3>
        <div className="text-xs text-[#888DA8] gap-2 flex items-center ">
          <IoClipboardOutline className="w-3.5 h-3.5" />
          {job.experience}
        </div>
        <div className="text-xs text-[#888DA8] gap-2 flex items-center ">
          <HiOutlineLocationMarker className="w-4 h-4   " />
          {job.location}
        </div>
        <div className="text-xs text-[#888DA8] gap-2 flex items-center ">
          <Colors width={13} height={13} />
          {job.tag}
        </div>
        <button
          className={`whitespace-nowrap px-[19px] mt-2.5 py-1.5  text-[13px] font-bold rounded-sm transition-all duration-200 bg-[#0F8200] text-white hover:bg-transparent  hover:text-[#0F8200] border hover:border-[#0F8200] border-white
          `}
          onClick={handleApplyNow}
        >
          Apply Now
        </button>
      </div>

      <div className="border-t border-black/10 pt-2.5 pb-5 px-3.5  text-gray-700">
        <h3 className="font-medium text-[13px] leading-[15px]  text-black mb-[15px]">
          Quick Info Section
        </h3>
        <ul className=" font-normal text-[12px] text-[#888DA8]">
          <li className="flex gap-[6px] items-center !mb-2">
            <ClockSvg />
            <span>Full Time / Part Time</span>
          </li>
          <li className="flex gap-[6px] items-center !mb-2">
            <Experience />
            <span>Experience: 3–5 Years</span>
          </li>
          <li className="flex gap-[6px] items-center !mb-2">
            <BookEducation />
            <span>Education: Bachelor's in Design</span>
          </li>
          <li className="flex gap-[6px] items-center !mb-2">
            <Dollar /> <span>Salary: ₹6–10 LPA</span>
          </li>
          <li className="flex gap-[6px] items-center !mb-2">
            <Graph />
            <span>Seniority Level: Mid-Level</span>
          </li>
          <li className="flex gap-[6px] items-center !mb-2">
            <PeopleSvg />
            <span>Number of Applicants: 2</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-black/10  text-[#888DA8] py-2.5  px-[17px]   text-sm ">
        <h3 className="font-medium text-[13px] leading-[15px]  text-black mb-[15px]">
          Job Description
        </h3>
        <p className="text-sm text-[#888DA8] text-[13px]  ">
          We are looking for a creative and detail-oriented UI/UX Designer to
          join our team... (Show full job description with bullets and
          paragraphs)
        </p>
      </div>

      <div className="border-t  border-black/10  text-[#888DA8] py-2.5  px-[17px]   text-sm ">
        <h3 className="font-medium text-[13px] leading-[15px]  text-black mb-[15px]">
          Responsibilities Section
        </h3>
        <ul className="list-disc list-inside font-normal text-[13px] pl-1 !space-y-2.5 pb-2">
          <li className="!list-disc !list-inside ">
            Design wireframes, prototypes, and high-fidelity UI.
          </li>
          <li className="!list-disc !list-inside">
            Collaborate with developers and stakeholders.
          </li>
          <li className="!list-disc !list-inside">Conduct user testing.</li>
        </ul>
      </div>

      <div className="border-t border-black/10  text-[#888DA8] py-2.5  px-[17px]   text-sm ">
        <h3 className="font-medium text-[13px] leading-[15px]  text-black mb-[15px]">
          Required Skills
        </h3>
        <div className="flex flex-wrap gap-2 text-[13px] font-normal leading-[17px] tracking-normal">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-neutralLight2 text-black text-xs px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className=" py-4 px-6 border-t border-black/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full p-0.5 border-1 border-gray-400 flex items-center justify-center overflow-hidden">
          <Image
            width={40}
            height={40}
            src={job.logo}
            alt={job.company}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-sm font-medium text-black">{job.company}</h4>
          <a
            href={`https://${job.url}`}
            className="text-xs text-[#007BFF] "
            target="_blank"
            rel="noopener noreferrer"
          >
            {job.url}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleJobDetail;
