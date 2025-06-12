"use client";

import { useTranslations } from "next-intl";

const ExperienceTab = ({ experience }) => {
  const t = useTranslations("UserProfile.profile.singleprofileTab");
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
                {item.startDate && item.endDate
                  ? (() => {
                      const startDate = new Date(item.startDate);
                      const endDate =
                        item.endDate === "Present" ? new Date() : new Date(item.endDate);
                      const diffYears = Math.floor(
                        (endDate - startDate) / (1000 * 60 * 60 * 24 * 365)
                      );
                      const diffMonths =
                        Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24 * 30)) % 12;

                      return `${startDate.toLocaleDateString()} - ${item.endDate === "Present" ? "Present" : endDate.toLocaleDateString()} (${diffYears} years ${diffMonths} months)`;
                    })()
                  : "Duration not specified"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceTab;
