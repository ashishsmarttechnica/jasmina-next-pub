"use client";
import React, { useState } from "react";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import SingleJobDetail from "./SingleJobDetail";
import Card from "@/common/card/Card";

const jobList = [
  {
    title: "UI/UX Designer",
    experience: "4 years",
    location: "Berlin, Japan",
    tag: "LGBTQ Friendly",
    skills: ["Figma", "Adobe XD", "HTML/CSS"],
    company: "The Walt Disney",
    url: "https://www.disney.com",
    logo: "https://logo.clearbit.com/disney.com",
    type: "Full Time / Part Time",
    education: "Bachelor's in Design",
    salary: "₹6–10 LPA",
    seniority: "Mid-Level",
    applicants: 2,
    description:
      "We are looking for a creative and detail-oriented UI/UX Designer...",
    responsibilities: [
      "Design wireframes and prototypes.",
      "Collaborate with developers and stakeholders.",
    ],
    posted: "1 day ago",
  },
  {
    title: "Frontend Designer",
    experience: "4 years",
    location: "Berlin, Japan",
    tag: "LGBTQ Friendly",
    skills: ["Figma", "Adobe XD", "HTML/CSS"],
    company: "The Walt Disney",
    url: "https://www.disney.com",
    logo: "https://logo.clearbit.com/disney.com",
    type: "Full Time / Part Time",
    education: "Bachelor's in Design",
    salary: "₹6–10 LPA",
    seniority: "Mid-Level",
    applicants: 2,
    description:
      "We are looking for a creative and detail-oriented UI/UX Designer...",
    responsibilities: [
      "Design wireframes and prototypes.",
      "Collaborate with developers and stakeholders.",
    ],
    posted: "1 day ago",
  },
  {
    title: "Backend Designer",
    experience: "4 years",
    location: "Berlin, Japan",
    tag: "LGBTQ Friendly",
    skills: ["Figma", "Adobe XD", "HTML/CSS"],
    company: "The Walt Disney",
    url: "https://www.disney.com",
    logo: "https://logo.clearbit.com/disney.com",
    type: "Full Time / Part Time",
    education: "Bachelor's in Design",
    salary: "₹6–10 LPA",
    seniority: "Mid-Level",
    applicants: 2,
    description:
      "We are looking for a creative and detail-oriented UI/UX Designer...",
    responsibilities: [
      "Design wireframes and prototypes.",
      "Collaborate with developers and stakeholders.",
    ],
    posted: "1 day ago",
  },
];

const JobCards = () => {
  const [selectedJob, setSelectedJob] = useState(null);

  return (
    <div className="flex flex-col md:flex-row w-full gap-6">
      {/* Left Column: Job List */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
        {jobList.map((job, index) => (
          <Card
            key={index}
            className="w-full border border-gray-300 hover:border-green-700 hover:bg-green-50 transition-all duration-200 cursor-pointer"
           onClick={() => setSelectedJob(job)}
          >
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                {job.title}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <IoClipboardOutline className="w-4 h-4" />
                {job.experience}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                <HiOutlineLocationMarker className="w-4 h-4" />
                {job.location}
              </p>
              <div className="flex items-center gap-2 border-t pt-3 mt-3">
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={28}
                  height={28}
                  className="rounded-md"
                />
                <span className="text-sm text-gray-500">{job.company}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Right Column: Job Detail */}
      {selectedJob && (
        <div className="w-full md:w-1/2">
          <SingleJobDetail
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
          />
        </div>
      )}
    </div>
  );
};

export default JobCards;
