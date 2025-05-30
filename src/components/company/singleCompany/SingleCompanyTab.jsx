"use client";

import SingleUserTabSkeleton from "@/common/skeleton/SingleUserTabSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import AboutTab from "./tabs/AboutTab";
import JobTab from "./tabs/JobTab";
import PeopleTab from "./tabs/PeopleTab";

const SingleCompanyTab = ({ userData, isLoading }) => {
  const [activeTab, setActiveTab] = useState("About"); // Set "About" as the default tab
  const tabs = ["About", "Job", "People"];

  // Calculate tab positions and widths
  const tabWidths = {
    About: "65px",
    Job: "65px",
    People: "70px",
  };

  const tabPositions = {
    About: "0px",
    Job: "70px",
    People: "150px",
  };

  const renderContent = () => {
    switch (activeTab) {
      case "About":
        return <AboutTab userData={userData} />;
      case "Job":
        return <JobTab userData={userData} />;
      case "People":
        return <PeopleTab userData={userData} />;

      default:
        return null;
    }
  };

  if (isLoading) {
    return <SingleUserTabSkeleton />;
  }

  return (
    <div className="bg-white shadow rounded-[5px]">
      <div className="relative hidden sm:flex gap-3 sm:gap-10 px-3 border-b border-black/10 text-[14px] font-medium text-gray-500">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize py-3.5 outline-none ${activeTab === tab ? "text-primary" : ""}`}
          >
            {tab}
          </button>
        ))}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="absolute -bottom-0.5 h-[3px] bg-primary"
          style={{
            width: tabWidths[activeTab],
            left: tabPositions[activeTab],
          }}
        />
      </div>

      {/* Mobile Dropdown */}
      <div className="sm:hidden p-4">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab} className="py-3 px-4">
                {tab}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="min-h-[200px]"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SingleCompanyTab;
