"use client";

import React from "react";

const EducationTab = ({ education }) => {
  // Check if education data exists and is an array
  if (!education || !Array.isArray(education) || education.length === 0) {
    return (
      <div className="p-4">
        <div className="px-[30px]">
          <p className="text-gray-500">No education information available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="px-[30px]">
        {/* Add your education content here */}
        <div className="space-y-2">
          {education.map((item, index) => (
            <div key={index} className="">
              <h3 className="font-medium">{item.schoolOrCollege}</h3>
              <h4 className="text-gray-500">{item.degreeName}</h4>
              <p className="text-sm text-gray-500">{item.passingYear}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationTab;
