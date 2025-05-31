"use client";

import { useTranslations } from "next-intl";
import React from "react";

const ExperienceTab = ({ experience }) => {
  const t= useTranslations("UserProfile.profile.singleprofileTab");
  // Handle empty or missing experience
  if (!experience || !Array.isArray(experience) || experience.length === 0) {
    return (
      <div className="p-4">
        <div className="px-[30px]">
          <p className="text-gray-500">{t("noexperience")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="px-[30px]">
        <div className="space-y-2">
          {experience.map((item, index) => (
            <div key={index} className="">
              <h3 className="font-medium">{item.companyName || "N/A"}</h3>
              <h4 className="text-gray-500">{item.position || "N/A"}</h4>
              <p className="text-sm text-gray-500">
                {item.yearsOfExperience != null && !isNaN(item.yearsOfExperience)
                  ? `${item.yearsOfExperience} year${item.yearsOfExperience === 1 ? "" : "s"}`
                  : "0 years"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTab;
