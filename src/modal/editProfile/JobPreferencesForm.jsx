"use client";

import InputField from "@/common/InputField";
import Selecter from "@/common/Selecter";
import JobTypeButton from "@/components/user/createUserProfile/JobTypeButton";
import {
  useCurrencyOptions,
  useIndustryOptions,
  useJobTypeOptions,
  useRoleOptions,
  useWorkLocationOptions,
} from "@/utils/selectOptions";
import { useTranslations } from "next-intl";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const JobPreferencesForm = forwardRef(
  ({ initialData, errors = {}, clearFieldError, availability }, ref) => {
    const [localData, setLocalData] = useState({
      jobRole: "",
      jobType: "",
      salaryRange: "",
      currency: "USD",
      joindate: "",
      workLocation: "",
      experience: "",
      industry: "",
    });
    const t = useTranslations("UserProfile.preferences");
    const roleOptions = useRoleOptions();
    const jobTypeOptions = useJobTypeOptions();
    const workLocationOptions = useWorkLocationOptions();
    const industryOptions = useIndustryOptions();
    const currencyOptions = useCurrencyOptions();

    useEffect(() => {
      if (initialData) {
        setLocalData({
          jobRole: initialData.jobRole || "",
          jobType: Array.isArray(initialData.jobType)
            ? initialData.jobType[0] || ""
            : initialData.jobType || "",
          salaryRange: initialData.expectedSalaryRange || "",
          joindate: initialData.availableFrom || "",
          workLocation: initialData.preferredLocation || "",
          currency: initialData.currency || "USD",
          // experience:
          //   initialData.yearsOfExperience !== undefined
          //     ? String(initialData.yearsOfExperience)
          //     : "",
          experience: initialData.yearsOfExperience || undefined,
          industry: initialData.preferredIndustry || "",
        });
      }
    }, [initialData]);

    useImperativeHandle(ref, () => ({
      getData: () => localData,
    }));

    const handleChange = (e) => {
      const { name, value } = e.target;
      // For experience field, only set value if it's not empty
      if (name === "experience") {
        setLocalData((prev) => ({
          ...prev,
          [name]: value.trim() === "" ? undefined : value,
        }));
      } else {
        setLocalData((prev) => ({ ...prev, [name]: value }));
      }
      if (clearFieldError) clearFieldError(name);
    };

    const handleJobTypeChange = (type) => {
      setLocalData((prev) => ({ ...prev, jobType: type }));
      if (clearFieldError) clearFieldError("jobType");
    };

    const handleDateChange = (val) => {
      setLocalData((prev) => ({ ...prev, joindate: val }));
      if (clearFieldError) clearFieldError("joindate");
    };

    return (
      <div className="space-y-4">
        <p className="mb-2 py-1 text-lg font-semibold text-gray-800">{t("JobPreferences")}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Selecter
            name="jobRole"
            label="Job Role *"
            value={localData.jobRole}
            onChange={handleChange}
            error={errors.jobRole}
            options={roleOptions}
            isClearable
            placeholder="Select Job Role"
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
          <div className="col-span-1 md:col-span-2">
            <label className="mb-1 block text-[14px] font-medium text-gray-700">
              {t("jobstype")}
            </label>
            <div className="flex flex-wrap gap-3">
              {jobTypeOptions.map((type) => (
                <JobTypeButton
                  key={type}
                  type={type}
                  selectedType={localData.jobType || ""}
                  onClick={() => handleJobTypeChange(type)}
                  // error={errors.jobType}
                />
              ))}
            </div>
            {/* {errors.jobType && <p className="mt-1 text-sm text-red-500">{errors.jobType}</p>} */}
          </div>
          {["Open to Work", "Available for Freelance"].includes(availability) && (
            <div>
              <InputField
                name="salaryRange"
                label={`${t("salaryrange")}`}
                value={localData.salaryRange}
                onChange={handleChange}
                // error={errors.salaryRange}
                placeholder="Enter salary range"
                className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
              />
              <p className="text-xs text-gray-500 md:col-span-2">{t("salaryrangeError")}</p>
            </div>
          )}
          <div className="flex flex-col">
            <Selecter
              name="currency"
              label={`${t("currency") || "Currency"} *`}
              value={localData.currency}
              onChange={handleChange}
              options={currencyOptions}
              placeholder="Select Currency"
              isSearchable
            />
            <p className="mt-1 text-xs text-gray-500">{t("CurrencyDescription")}</p>
          </div>

          <div>
            <InputField
              name="experience"
              label={`${t("experience")}`}
              value={localData.experience || ""}
              onChange={handleChange}
              // error={errors.experience}
              type="number"
              max={50}
              placeholder="Enter years of experience"
              className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
            />
            {/* <p className="text-xs text-gray-500 md:col-span-2">{t("experienceError")}</p> */}
          </div>
          {/* <CustomDatePicker
          name="joindate"
          label={`${t("availablefrom")}`}
          value={localData.joindate}
          onChange={handleDateChange}
          error={errors.joindate}
          className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
        /> */}
          <Selecter
            label={`${t("worklocation")}`}
            name="workLocation"
            value={localData.workLocation}
            onChange={handleChange}
            // error={errors.workLocation}
            options={workLocationOptions}
            placeholder={t("SelectWorkLocation")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
          <Selecter
            label={`${t("industry")}`}
            name="industry"
            value={localData.industry}
            onChange={handleChange}
            // error={errors.industry}
            options={industryOptions}
            placeholder={t("SelectIndustry")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
        </div>
      </div>
    );
  }
);

export default JobPreferencesForm;
