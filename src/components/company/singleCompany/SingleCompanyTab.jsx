"use client";

import SingleUserTabSkeleton from "@/common/skeleton/SingleUserTabSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import AboutTab from "./tabs/AboutTab";
import JobTab from "./tabs/JobTab";
import PeopleTab from "./tabs/PeopleTab";

const SingleCompanyTab = ({ userData, isLoading }) => {
  const [activeTab, setActiveTab] = useState("About"); // Set "About" as the default tab
  const t = useTranslations("CompanyProfile.singleCompanyTab");
  const tabs = [`${t("about")}`, `${t("job")}`, `${t("people")}`];
  // Calculate tab positions and widths
  const About = t("about");
  const Job = t("job");
  const People = t("people");
  const tabWidths = {
    [About]: "65px",
    [Job]: "65px",
    [People]: "70px",
  };

  const tabPositions = {
    [About]: "0px",
    [Job]: "70px",
    [People]: "150px",
  };

  const renderContent = () => {
    switch (activeTab) {
      case `${t("about")}`:
        return <AboutTab userData={userData} />;
      case `${t("job")}`:
        return <JobTab userData={userData} />;
      case `${t("people")}`:
        return <PeopleTab userData={userData} />;

      default:
        return null;
    }
  };

  if (isLoading) {
    return <SingleUserTabSkeleton />;
  }

  return (
    <div className="rounded-[5px] bg-white shadow">
      <div className="relative hidden gap-3 border-b border-black/10 px-3 text-[14px] font-medium text-gray-500 sm:flex sm:gap-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3.5 capitalize outline-none ${activeTab === tab ? "text-primary" : ""}`}
          >
            {tab}
          </button>
        ))}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
          className="bg-primary absolute -bottom-0.5 h-[3px]"
          style={{
            width: tabWidths[activeTab],
            left: tabPositions[activeTab],
          }}
        />
      </div>

      {/* Mobile Dropdown */}
      <div className="p-4 sm:hidden">
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="focus:ring-primary/20 focus:border-primary w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:ring-2 focus:outline-none"
          >
            {tabs.map((tab) => (
              <option key={tab} value={tab} className="px-4 py-3">
                {tab}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
            <svg
              className="h-5 w-5 text-gray-500"
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
