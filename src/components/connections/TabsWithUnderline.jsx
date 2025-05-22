"use client";
import React from "react";
import { motion } from "framer-motion";

const TabsWithUnderline = ({
  activeTab,
  setActiveTab,
  peopleRef,
  companyRef,
  hoverStyle,
  underlineStyle,
  handleHover,
  handleHoverLeave,
}) => {
    
  return (
    <div className="relative flex gap-0 text-[14px] font-medium border-b border-black/10">
      <button
        ref={peopleRef}
        onClick={() => setActiveTab("people")}
        onMouseEnter={() => handleHover(peopleRef)}
        onMouseLeave={handleHoverLeave}
        className={`py-3.5 px-4 sm:px-6 outline-none transition-all duration-200 hover:scale-[1.02] ${
          activeTab === "people"
            ? "text-primary"
            : "text-grayBlueText hover:text-primary/80"
        }`}
      >
        People
      </button>

      <button
        ref={companyRef}
        onClick={() => setActiveTab("company")}
        onMouseEnter={() => handleHover(companyRef)}
        onMouseLeave={handleHoverLeave}
        className={`py-3.5 px-4 sm:px-6 outline-none transition-all duration-200 hover:scale-[1.02] ${
          activeTab === "company"
            ? "text-primary"
            : "text-grayBlueText hover:text-primary/80"
        }`}
      >
        Company
      </button>

      {/* Hover underline */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className="absolute bottom-[-2.3px] h-1 bg-primary/40 transition-all duration-300 ease-in-out"
        style={{
          width: `${hoverStyle.width}px`,
          left: `${hoverStyle.left}px`,
          opacity: hoverStyle.opacity,
        }}
      />

      {/* Active underline */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className="absolute bottom-[-2.3px] h-1 bg-primary transition-all duration-300 ease-in-out"
        style={{
          width: `${underlineStyle.width}px`,
          left: `${underlineStyle.left}px`,
        }}
      />
    </div>
  );
};

export default TabsWithUnderline;
