import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import Selecter from "@/common/Selecter";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import usePreferencesForm from "@/hooks/validation/user/usePreferencesForm";
import useAuthStore from "@/store/auth.store";
import {
  useIndustryOptions,
  useJobTypeOptions,
  useRoleOptions,
  useWorkLocationOptions,
} from "@/utils/selectOptions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";
import ReusableForm from "@/components/form/ReusableForm";
import JobTypeButton from "./JobTypeButton";

const Preferences = ({ setActiveTab }) => {
  const { user, setUser } = useAuthStore();
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();
  const t = useTranslations("UserProfile.preferences");
  const { errors, setErrors, validateForm, clearFieldError } = usePreferencesForm();

  const roleOptions = useRoleOptions();
  const jobTypeOptions = useJobTypeOptions();
  const workLocationOptions = useWorkLocationOptions();
  const industryOptions = useIndustryOptions();

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
    <ReusableForm title={t("title")} maxWidth="max-w-[698px]" subtitle={t("subTitle")}>
      <form className="w-full rounded-lg" onSubmit={handleSubmit}>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <label className="text-grayBlueText mb-1 block text-[14px]">{`${t("jobtype")}*`}</label>
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
              {errors.jobType && <p className="text-sm text-red-500">{errors.jobType}</p>}
            </div>
          </div>

          <div className="flex flex-col">
            <InputField
              label={`${t("salaryrange")}*`}
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              error={errors.salaryRange}
              type="text"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter your expected salary range (e.g., 50,000-70,000)
            </p>
          </div>
          {/* extra div for spacing */}
          <div className=""></div>

          <div className="flex flex-col">
            <InputField
              label={`${t("experience")} * `}
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              type="number"
              max={50}
              className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter your total years of professional experience
            </p>
          </div>
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
