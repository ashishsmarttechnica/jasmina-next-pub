"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";

const Selecter = ({
  name,
  value,
  onChange,
  error,
  options = [],
  label = "",
  placeholder = "Select an option",
  isLoading = false,
  disabled = false,
  isSearchable = false,
}) => {
  const t = useTranslations("Common");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSelect = (val) => {
    onChange({ target: { name, value: val } });
    setIsOpen(false);
    setSearchTerm("");
  };

  // Filter options based on search term
  const filteredOptions = isSearchable
    ? options.filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && isSearchable && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen, isSearchable]);

  // 👇 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (isOpen) {
        setSearchTerm("");
      }
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Prevent dropdown from closing when clicking on search input
  const handleSearchClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="text-grayBlueText text-[14px]">{label}</label>}

      <div
        className={`border-lightGray/75 flex w-full items-center justify-between rounded border p-2 transition-all duration-200 ease-in-out ${
          disabled
            ? "cursor-not-allowed bg-gray-100 opacity-70"
            : "hover:border-primary hover:bg-primary/5 active:bg-primary/10 cursor-pointer"
        }`}
        onClick={toggleDropdown}
      >
        <span className={`${value ? "text-black" : "text-grayBlueText"} truncate`}>
          {isLoading
            ? "Loading..."
            : value
              ? options.find((o) => o.value === value)?.label
              : placeholder}
        </span>

        {isLoading ? (
          <div className="border-primary h-4 w-4 animate-spin rounded-full border-b-2"></div>
        ) : (
          <FiChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            } ${value ? "text-black" : "text-grayBlueText"}`}
          />
        )}
      </div>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-lightGray/50 absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
          >
            {/* Search input - only shown when isSearchable is true */}
            {isSearchable && (
              <div className="border-lightGray/20 sticky top-0 border-b bg-white p-2">
                <div className="relative">
                  <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onClick={handleSearchClick}
                    placeholder={t("search")}
                    className="border-lightGray/50 focus:ring-primary focus:border-primary w-full rounded-md border py-2 pr-3 pl-10 focus:ring-1 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <div className="py-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`hover:bg-lightGray/20 cursor-pointer px-4 py-2 ${
                      value === option.value ? "bg-lightGray/30 font-medium" : ""
                    }`}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 italic">{t("noResults")}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Selecter;
