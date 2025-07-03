"use client";
import { getAllMemberships } from "@/api/membership.api";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

const Interviews = () => {
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState(null);

  const {
    data: membershipData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["memberships"],
    queryFn: getAllMemberships,
  });

  const jobListings = [
    {
      id: 1,
      title: "Jerome Bell",
      type: "Frontend Developer",
      duration: "3 to 3:30 pm",
      postedDate: "Today",
      timeAgo: "10 months ago",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Courtney Henry",
      type: "Backend Developer",
      duration: "10 to 10:45 am",
      postedDate: "24/4/2024",
      timeAgo: "11 months ago",
      status: "Pending",
    },
    {
      id: 3,
      title: "Darlene Robertson",
      type: "UI/UX Designer",
      duration: "1 to 2 pm",
      postedDate: "24/4/2024",
      timeAgo: "1 year ago",
      status: "Past",
    },
    {
      id: 4,
      title: "Ronald Richards",
      type: "Full Stack Developer",
      duration: "11 to 11:30 am",
      postedDate: "24/4/2024",
      timeAgo: "1 year ago",
      status: "Upcoming",
    },
    {
      id: 5,
      title: "Cody Fisher",
      type: "Mobile App Developer",
      duration: "4 to 4:30 pm",
      postedDate: "24/4/2024",
      timeAgo: "1 year ago",
      status: "Pending",
    },
  ];

  const filteredJobs =
    activeTab === null ? jobListings : jobListings.filter((job) => job.status === activeTab);

  const subscriptionPlans = membershipData?.data || [];

  const handleJobClick = (id, subId) => {
    console.log("Clicked job ID:", id, "Sub ID:", subId);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-primary">Loading subscriptions...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-red-500">Error loading subscriptions. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="p-2">
      {/* Tabs */}
      <div className="flex gap-2">
        {["Upcoming", "Pending", "Past"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium shadow-md ${
              activeTab === tab
                ? "bg-primary text-white"
                : "hover:bg-secondary hover:text-primary bg-[#F2F2F2] text-[#888DA8]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <div className="rounded-lg bg-white shadow-md">
          {filteredJobs.map((job, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center justify-between border-b border-gray-100 px-5 py-3 hover:bg-gray-50"
              // onClick={() => handleJobClick(job.id, job.subId)}
            >
              <div className="block">
                <h3 className="text-[14px] font-medium">{job.title}</h3>
                <p className="text-sm text-gray-500">{job.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-sm text-black">
                  <p>{job.postedDate}</p> <span className="px-1">·</span>
                  <p>{job.duration}</p>
                </div>
              </div>
              <div className="flex items-center">
                <button className="bg-primary hover:text-primary hover:border-primary mx-2 w-full rounded-sm px-3 py-2 text-[13px] text-white hover:border hover:bg-white sm:mx-2 sm:w-auto">
                  Reschedule
                </button>
                <button className="text-primary border-primary w-full rounded border px-4 py-1.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto">
                  Cancel
                </button>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && (
            <div className="p-5 text-center text-sm text-gray-500">
              No interviews in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
