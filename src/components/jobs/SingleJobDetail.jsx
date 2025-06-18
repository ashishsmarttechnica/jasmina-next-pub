"use client";
import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import { MdBookmark } from "react-icons/md";
import { LuBookmark } from "react-icons/lu";
import Experience from "@/assets/svg/jobs/Experience";
import Dollar from "@/assets/svg/jobs/Dollar";
import Graph from "@/assets/svg/jobs/Graph";
import PeopleSvg from "@/assets/svg/jobs/PeopleSvg";
import Colors from "@/assets/svg/jobs/colors";
import ClockSvg from "@/assets/svg/jobs/ClockSvg";
import BookEducation from "@/assets/svg/jobs/BookEducation";

const SingleJobDetail = ({ job, onBack }) => {
  // if (!job) return <div>Loading job details...</div>;

  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked((prev) => !prev);
  };

  const handleApplyNow = () => {
    alert("Apply now clicked!");
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-5">
      {/* <button
        className="text-sm text-blue-600 underline mb-3"
        onClick={onBack}
      >
        ← Back to job list
      </button> */}

      <h3 className="flex justify-between font-semibold text-lg text-black mb-2">
        {job?.title}
        <span onClick={toggleBookmark} className="cursor-pointer">
          {bookmarked ? (
            <MdBookmark className="text-xl text-[#888DA8]" />
          ) : (
            <LuBookmark className="text-xl text-[#888DA8]" />
          )}
        </span>
      </h3>

      <div className="text-sm text-[#888DA8] flex gap-3 mb-2">
        <IoClipboardOutline className="w-4 h-4" />
        {job?.experience}
      </div>
      <div className="text-sm text-[#888DA8] flex gap-3 mb-2">
        <HiOutlineLocationMarker className="w-4 h-4" />
        {job?.location}
      </div>
      <div className="text-sm text-[#888DA8] flex gap-3 mb-2">
        <Colors width={13} height={13} />
        {job?.tag}
      </div>

      <button
        className="bg-green-700 text-white py-1.5 px-4 rounded text-sm font-medium mt-3 hover:bg-green-800"
        onClick={handleApplyNow}
      >
        Apply Now
      </button>

      <div className="border-t mt-4 pt-3 text-gray-700 text-sm">
        <h4 className="font-medium mb-2">Quick Info Section</h4>
        <ul className="space-y-2 text-[#888DA8] text-sm">
          <li className="flex items-center gap-2">
            <ClockSvg />
            {job?.type}
          </li>
          <li className="flex items-center gap-2">
            <Experience />
            Experience: {job?.experience}
          </li>
          <li className="flex items-center gap-2">
            <BookEducation />
            Education: {job?.education}
          </li>
          <li className="flex items-center gap-2">
            <Dollar />
            Salary: {job?.salary}
          </li>
          <li className="flex items-center gap-2">
            <Graph />
            Seniority: {job?.seniority}
          </li>
          <li className="flex items-center gap-2">
            <PeopleSvg />
            Applicants: {job?.applicants}
          </li>
        </ul>
      </div>

      <div className="border-t mt-4 pt-3 text-sm text-[#888DA8]">
        <h4 className="font-medium text-black mb-2">Job Description</h4>
        <p>{job?.description}</p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          {job?.responsibilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleJobDetail;
