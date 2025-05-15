"use client";
import { useTranslations } from "next-intl";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({
  value,
  onChange,
  maxDate,
  minDate,
  error,
  label,
  disabled,
}) => {
  const t = useTranslations("UserProfile.profile");
  return (
    <div className="space-y-1">
      <label className="text-[14px] text-grayBlueText">{label}</label>
      <div className="relative">
        <DatePicker
          selected={value ? new Date(value) : null}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          className="border border-lightGray/[75%] p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-lightGray/[50%] transition-all"
          placeholderText={t("dobPlaceholder")}
          disabled={disabled}
          maxDate={maxDate ? new Date(maxDate) : undefined}
          minDate={minDate ? new Date(minDate) : undefined}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          wrapperClassName="w-full"
          customInput={
            <input className="border border-lightGray/75 p-2 rounded w-full  transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent hover:border-primary hover:bg-primary/5 active:bg-primary/10" />
          }
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
