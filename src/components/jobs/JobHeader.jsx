"use client";
import Bar from "@/assets/svg/jobs/Bar";
import Colors from "@/assets/svg/jobs/colors";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";

const JobHeader = ({ filters, setFilters, showSaveJobsLink = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("LGBTQ+");
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [locationInput, setLocationInput] = useState(filters.location || "");
  const t = useTranslations("Jobs");
  const options = [t("lgbtqOption"), t("nonLgbtqOption")];

  return (
    <div className="flex flex-col items-stretch justify-between gap-1 rounded-md bg-white px-2 py-1 shadow-sm sm:items-center sm:gap-1 lg:flex-row 2xl:mx-0">
      <div className="flex w-full flex-col justify-center gap-2 py-1 lg:flex-row lg:justify-start lg:gap-0">
        <div className="text-grayBlueText flex w-full items-center justify-around rounded-md border border-black/10 px-3 py-1 lg:max-w-[224px] lg:border-none xl:w-[260px] xl:max-w-[260px]">
          <FiSearch className="text-grayBlueText mr-2 text-2xl lg:text-3xl" />
          <input
            type="text"
            placeholder={t("jobTitleOrCompanyPlaceholder")}
            className="placeholder-grayBlueText w-full text-[16px] outline-none"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <div className="text-grayBlueText hidden w-full items-center justify-center border-black/10 px-3 py-1 text-[16px] lg:flex lg:max-w-[171px] lg:border-x">
          <HiOutlineLocationMarker className="text-grayBlueText mr-2 text-2xl lg:text-3xl" />
          <input
            type="text"
            placeholder={t("Location")}
            className="placeholder-grayBlueText w-full text-[16px] outline-none"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex w-full flex-row gap-2 pb-0.5 lg:max-w-[266px] xl:pr-2">
        <div className="text-grayBlueText flex items-center rounded-md border border-black/10 px-3 sm:w-[40%] lg:hidden lg:max-w-[157px] lg:border-x 2xl:w-[157px]">
          <HiOutlineLocationMarker className="text-grayBlueText mr-2 text-2xl lg:text-3xl" />
          <input
            type="text"
            placeholder="Location"
            className="placeholder-grayBlueText w-full text-[16px] outline-none"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
          />
        </div>

        <div className="relative flex-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-uiLight shadow-job-dropdown flex w-full items-center justify-between rounded-md px-3 py-1"
          >
            <div className="text-grayBlueText flex items-center gap-2 text-[16px]">
              {selected === "LGBTQ+" && <Colors className="h-5 w-5" />}
              {selected === "Non-LGBTQ+" && <Bar className="h-5 w-5" />}
              <span>{selected}</span>
            </div>
            <FaChevronDown
              className={`text-grayBlueText text-base transition-transform duration-500 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md">
              {options.map((option) => (
                <li
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                  className="text-grayBlueText cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex gap-2">
          {/* {showSaveJobsLink && (
            <Link href="/jobs/save-jobs">
              <button className="flex items-center gap-1 rounded-sm border border-[#0F8200] bg-transparent px-2 py-1.5 text-[13px] !leading-[15px] font-medium whitespace-nowrap text-[#0F8200] transition-all duration-200 hover:bg-[#0F8200] hover:text-white">
                <FaBookmark size={12} />
                Saved
              </button>
            </Link>
          )} */}
          <button
            className="rounded-sm border border-white bg-[#0F8200] px-2 py-1.5 text-[13px] !leading-[15px] font-medium whitespace-nowrap text-white transition-all duration-200 hover:border hover:border-[#0F8200] hover:bg-transparent hover:text-[#0F8200]"
            onClick={() => {
              const filtersInput = {
                search: searchInput,
                location: locationInput,
                lgbtq: selected === "LGBTQ+",
              };
              setFilters(filtersInput);
            }}
          >
            {t("FindJob")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
