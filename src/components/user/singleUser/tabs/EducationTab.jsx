"use client";
import { useTranslations } from "next-intl";
import { useState } from "react";

const EducationTab = ({ education }) => {
  const t = useTranslations("UserProfile.profile.singleprofileTab");
  const [visibleCount, setVisibleCount] = useState(3);

  // Check if education data exists and is an array
  if (!education || !Array.isArray(education) || education.length === 0) {
    return (
      <div className="p-4">
        <div className="px-[30px]">
          <p className="text-gray-500">{t("Nodatafound")}</p>
        </div>
      </div>
    );
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  }

  // Slice education data to show only visible count
  const visibleEducation = education.slice(0, visibleCount);
  const hasMore = visibleCount < education.length;

  return (
    <div className="p-4">
      <div className="px-[30px]">
        {/* Add your education content here */}
        <div className="space-y-2">
          {visibleEducation.map((item, index) => (
            <div key={index} className="">
              <h3 className="font-medium">{item.schoolOrCollege}</h3>
              <h4 className="text-gray-500">{item.degreeName}</h4>
              <p className="text-sm text-gray-500">{item.passingYear}</p>
            </div>
          ))}
        </div>
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
        {/* {!hasMore && education.length > 0 && (
          <div className="mt-2 text-center text-gray-500">
            <p>{t("noeducation")}</p>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EducationTab;
