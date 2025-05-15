"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const GenderSelector = ({ value, onChange, error }) => {
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (val) => {
    onChange({ target: { name: "gender", value: val } });
    setIsOpen(false);
  };

  return (
    <div className=" relative">
      <label className="text-[14px] text-grayBlueText">Gender*</label>

      <div
        className="w-full border border-lightGray/[75%] p-2 bg-white cursor-pointer rounded-md flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value
          ? options.find((o) => o.value === value)?.label
          : "Select Gender"}

        <FiChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-full mt-1 bg-white border border-lightGray/50 rounded-md shadow-lg "
          >
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`px-4 py-2 hover:bg-lightGray/20 cursor-pointer  ${
                  value === option.value ? "bg-lightGray/30 font-medium" : ""
                }`}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default GenderSelector;
