import React, { useEffect, useState } from "react";
import ReusableForm from "../../form/ReusableForm";
import usePreferencesForm from "@/hooks/validation/user/usePreferencesForm";
import Selecter from "@/common/Selecter";
import CustomDatePicker from "@/common/DatePicker";
import JobTypeButton from "./JobTypeButton";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import useAuthStore from "@/store/auth.store";
import { useTranslations } from "next-intl";
import InputField from "@/common/InputField";
import { Loader } from "rsuite";

const Preferences = ({ setActiveTab }) => {
  const { user, setUser } = useAuthStore();
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();
  const t = useTranslations("UserProfile.preferences");
  const { errors, setErrors, validateForm, clearFieldError } =
    usePreferencesForm();

  const [formData, setFormData] = useState({
    role: "",
    jobType: "",
    salaryRange: "",
    joindate: "",
    workLocation: "",
    experience: "",
    industry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") {
      clearFieldError(name);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, joindate: date }));

    if (date) {
      clearFieldError("joindate");
    }
  };

  const handleJobTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, jobType: type }));
    if (type.trim() !== "") {
      clearFieldError("jobType");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    const submitData = new FormData();
    submitData.append("preferences.jobRole", formData.role);
    submitData.append("preferences.jobType", formData.jobType);
    submitData.append("preferences.expectedSalaryRange", formData.salaryRange);
    submitData.append("preferences.availableFrom", formData.joindate);
    submitData.append("preferences.preferredLocation", formData.workLocation);
    submitData.append("preferences.yearsOfExperience", +formData.experience);
    if (formData.industry.trim() !== "") {
      submitData.append("preferences.preferredIndustry", formData.industry);
    }
    submitData.append("steps", 2);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          setActiveTab(2);
        }
      },
    });
  };

  const roleOptions = [
    { label: `${t("jobroleoption.web-designer")}`, value: "web-designer" },
    { label: `${t("jobroleoption.web-developer")}`, value: "web-developer" },
    { label: `${t("jobroleoption.game-developer")}`, value: "game-developer" },
    { label: `${t("jobroleoption.app-developer")}`, value: "app-developer" },
    {
      label: `${t("jobroleoption.graphic-designer")}`,
      value: "graphic-designer",
    },
    { label: `${t("jobroleoption.ui-ux-designer")}`, value: "ui-ux-designer" },
  ];

  const jobTypeOptions = [
    `${t("jobtypeoption.full-time")}`,
    `${t("jobtypeoption.part-time")}`,
    `${t("jobtypeoption.internship")}`,
    `${t("jobtypeoption.freelancer")}`,
    `${t("jobtypeoption.remote")}`,
  ];

  const experienceOptions = [
    { label: `${t("experienceoption.beginner")}`, value: "beginner" },
    { label: `${t("experienceoption.intermediate")}`, value: "intermediate" },
    { label: `${t("experienceoption.advanced")}`, value: "advanced" },
    { label: `${t("experienceoption.expert")}`, value: "expert" },
  ];

  // const experienceOptions = [
  //   { label: "1", value: 1 },
  //   { label: "2", value: 2 },
  //   { label: "3", value: 3 },
  //   { label: "4", value: 4 },
  //   { label: "5", value: 5 },
  //   { label: "6", value: 6 },
  // ];

  const workLocationOptions = [
    { label: `${t("worklocationoption.remote")}`, value: "remote" },
    { label: `${t("worklocationoption.onsite")}`, value: "on-site" },
  ];

  const industryOptions = [
    { label: `${t("industryoption.design")}`, value: "design" },
    { label: `${t("industryoption.development")}`, value: "development" },
  ];

  useEffect(() => {
    if (user?.preferences) {
      setFormData((prev) => ({
        ...prev,
        role: user.preferences.jobRole || "",
        jobType: user.preferences.jobType[0] || "",
        salaryRange: user.preferences.expectedSalaryRange || "",
        joindate: user.preferences.availableFrom || "",
        workLocation: user.preferences.preferredLocation || "",
        experience: user.preferences.yearsOfExperience || "",
        industry: user.preferences.preferredIndustry || "",
      }));
    }
  }, [user]);

  return (
    <ReusableForm
      title={t("title")}
      maxWidth="max-w-[698px]"
      subtitle={t("subTitle")}
    >
      <form className="w-full rounded-lg" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
          <Selecter
            name="role"
            label={`${t("jobrole")} *`}
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
            options={roleOptions}
            placeholder={t("SelectJobRole")}
          />

          <div>
            <label className="text-[#888DA8] text-[14px] block mb-1">
              {`${t("jobtype")}*`}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {jobTypeOptions.map((type) => (
                <JobTypeButton
                  key={type}
                  type={type}
                  selectedType={formData.jobType}
                  onClick={handleJobTypeChange}
                  error={errors.jobType}
                />
              ))}
            </div>
            <div className="mt-1">
              {errors.jobType && (
                <p className="text-red-500 text-sm">{errors.jobType}</p>
              )}
            </div>
          </div>

          <InputField
            label={`${t("salaryrange")}*`}
            name="salaryRange"
            value={formData.salaryRange}
            onChange={handleChange}
            error={errors.salaryRange}
            type="text"
          />
          {/* extra div for spacing */}
          <div className=""></div>

          <InputField
            label={`${t("experience")} * `}
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            error={errors.experience}
            type="number"
            max={50}
          />
          {/* <Selecter
            name="experience"
            label={t("experience")}
            value={formData.experience}
            onChange={handleChange}
            error={errors.experience}
            options={experienceOptions}
            placeholder={t("SelectExperience")}
          /> */}

          <CustomDatePicker
            value={formData.joindate}
            onChange={handleDateChange}
            error={errors.joindate}
            label={`${t("availablefrom")}*`}
            disabled={false}
          />

          <Selecter
            name="workLocation"
            label={`${t("worklocation")}*`}
            value={formData.workLocation}
            onChange={handleChange}
            error={errors.workLocation}
            options={workLocationOptions}
            placeholder={t("SelectWorkLocation")}
          />

          <Selecter
            name="industry"
            label={`${t("industry")}`}
            value={formData.industry}
            onChange={handleChange}
            options={industryOptions}
            placeholder={t("SelectIndustry")}
          />
        </div>

        <div className="block space-y-4">
          <button className="btn-fill">
            {" "}
            {isPending ? (
              <div>
                <Loader inverse />
              </div>
            ) : (
              `${t("Next")} >`
            )}
          </button>
        </div>
      </form>
    </ReusableForm>
  );
};

export default Preferences;
