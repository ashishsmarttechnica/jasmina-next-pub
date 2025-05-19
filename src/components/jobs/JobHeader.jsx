"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa6";
import Colors from "@/assets/svg/jobs/colors";

const JobHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("LGBTQ+");
  const options = ["LGBTQ+", "Non-LGBTQ+"];
  return (
    <div className=" bg-white  shadow-sm rounded-md px-2  2xl:mx-0 py-1  flex flex-col  lg:flex-row justify-between items-stretch sm:items-center gap-1 sm:gap-1">
      <div className="flex flex-col lg:flex-row justify-center  lg:justify-start w-full gap-2 lg:gap-0 py-1 ">
        <div className="flex items-center  lg:max-w-[224px] xl:max-w-[260px]  xl:w-[260px] justify-around px-3 py-1  border lg:border-none rounded-md w-full border-black/10 text-grayBlueText ">
          <FiSearch className="text-grayBlueText text-2xl lg:text-3xl mr-2" />
          <input
            type="text"
            placeholder="Job title or Company"
            className="outline-none w-full text-[16px]  placeholder-grayBlueText"
          />
        </div>
        <div className="hidden lg:flex items-center justify-center text-grayBlueText text-[16px]  lg:border-x  w-full  border-black/10 px-3 py-1 lg:max-w-[171px] ">
          <HiOutlineLocationMarker className="text-grayBlueText text-2xl lg:text-3xl mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="outline-none w-full text-[16px] placeholder-grayBlueText"
          />
        </div>
      </div>
      <div className="flex flex-row gap-2  pb-0.5 lg:max-w-[266px] xl:pr-2 w-full">
        <div className="flex lg:hidden  items-center border rounded-md  lg:border-x border-black/10 text-grayBlueText  lg:max-w-[157px]  2xl:w-[157px] px-3  sm:w-[40%]">
          <HiOutlineLocationMarker className="text-grayBlueText text-2xl lg:text-3xl mr-2" />
          <input
            type="text"
            placeholder="Location"
            className="outline-none w-full text-[16px]  placeholder-grayBlueText"
          />
        </div>

        <div className="relative flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full  bg-uiLight  shadow-job-dropdown rounded-md px-3 py-1"
          >
            <div className="flex items-center gap-2 text-grayBlueText text-[16px]">
              <Colors className="w-5 h-5" />
              <span>{selected}</span>
            </div>
            <FaChevronDown
              className={`text-grayBlueText text-base transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-md">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 text-sm text-grayBlueText hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button className="whitespace-nowrap py-1.5 px-2 text-[13px] font-medium !leading-[15px] bg-[#0F8200] text-white rounded-sm hover:bg-transparent hover:text-[#0F8200] hover:border border-white border hover:border-[#0F8200] transition-all duration-200">
          Find Job
        </button>
      </div>
    </div>
  );
};

export default JobHeader;
