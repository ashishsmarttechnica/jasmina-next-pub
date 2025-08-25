"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

const ExperienceTab = ({ experience }) => {
  const t = useTranslations("UserProfile.profile.singleprofileTab");
  const [visibleCount, setVisibleCount] = useState(3);
  // Filter out empty placeholder items and handle empty or missing experience data early
  const isExperienceItemValid = (item) => {
    if (!item || typeof item !== "object") return false;
    const textFields = [item.companyName, item.position, item.jobTitle, item.location];
    const hasText = textFields.some((v) => typeof v === "string" && v.trim().length > 0);
    const hasDates = Boolean(item.startDate) || Boolean(item.endDate);
    return hasText || hasDates;
  };

  const validExperiences = Array.isArray(experience) ? experience.filter(isExperienceItemValid) : [];

  if (validExperiences.length === 0) {
    return (
      <div className="p-4">
        <div className="px-[30px]">
          <p className="text-gray-500">{t("noexperience")}</p>
        </div>
      </div>
    );
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleExperiences = validExperiences.slice(0, visibleCount);
  const hasMore = visibleCount < validExperiences.length;

  return (
    <div className="p-4">
      <div className="px-[30px]">
        <div className="space-y-2">
          {visibleExperiences.map((item, index) => (
            <div key={index} className="">
              <h3 className="font-medium">{item.companyName}</h3>
              <h4 className="text-gray-500">{item.position}</h4>
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
                  : ""}
              </p>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="bg-primary text-[13px] hover:bg-primary/90 text-white px-3 py-1.5 rounded-md font-medium transition-colors"
            >
              {t("loadmore")}
            </button>
          </div>
        )}

        {/* No More Experiences Message */}
        {/* {!hasMore && experience.length > 0 && (
          <div className="mt-2 text-center text-gray-500">
            <p>{t("noexperience")}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ExperienceTab;
