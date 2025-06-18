"use client";
import Card from "@/common/card/Card";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoClipboardOutline } from "react-icons/io5";
import SingleJobDetail from "./SingleJobDetail";

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
    description: "We are looking for a creative and detail-oriented UI/UX Designer...",
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
    description: "We are looking for a creative and detail-oriented UI/UX Designer...",
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
    description: "We are looking for a creative and detail-oriented UI/UX Designer...",
    responsibilities: [
      "Design wireframes and prototypes.",
      "Collaborate with developers and stakeholders.",
    ],
    posted: "1 day ago",
  },
];

const JobCards = () => {
  const [selectedJob, setSelectedJob] = useState(jobList[0]);

  return (
    <div className="flex w-full flex-col gap-6 md:flex-row">
      {/* Left Column: Job List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
        {jobList.map((job, index) => (
          <Card
            key={index}
            className={`w-full cursor-pointer border transition-all duration-200 hover:border-green-700 hover:bg-green-50 ${
              selectedJob?.title === job.title ? "border-green-700 bg-green-200" : "border-gray-300"
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
              <div className="mt-3 flex items-center gap-2 border-t pt-3">
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
        <div className="w-full md:w-[65%]">
          <SingleJobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
        </div>
      )}
    </div>
  );
};

export default JobCards;
