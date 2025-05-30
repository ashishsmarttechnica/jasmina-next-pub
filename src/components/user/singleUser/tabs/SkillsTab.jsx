"use client";

import React from "react";

const SkillsTab = ({ skills }) => {
  // Handle empty or missing skills
  if (!skills || !Array.isArray(skills) || skills.length === 0) {
    return (
      <div className="p-4">
        <div className="px-[30px]">
          <p className="text-gray-500">No skills information available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="px-[30px]">
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-baseline gap-2">
              <span className="font-bold text-lg">{skill.name}</span>
              <span className="text-gray-500 text-base">
                {skill.yearsOfExperience} year
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
