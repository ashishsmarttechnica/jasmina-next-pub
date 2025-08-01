"use client";

import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import RadioGroup from "@/common/RadioGroup";
import SalaryRangeInput from "@/common/SalaryRangeInput";
import Selecter from "@/common/Selecter";
import ReusableForm from "@/components/form/ReusableForm";
import SkillsInput from "@/components/form/SkillsInput";
import useSalaryInfoValidation from "@/hooks/validation/job/useSalaryInfoValidation";
import { useCallback, useEffect } from "react";

const SalaryAndInfo = ({ formData, onChange, errors: parentErrors, onNext, onBack }) => {
  const { errors, setErrors, validateForm, clearError } = useSalaryInfoValidation();

  // Merge parent errors with local errors for display
  useEffect(() => {
    if (parentErrors) {
      setErrors((prev) => ({ ...prev, ...parentErrors }));
    }
  }, [parentErrors, setErrors]);

  // Validate form data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm(formData)) {
      return;
    }

    onNext();
  };

  const workModeOptions = [
    { value: "On-site", label: "On-site" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "Remote", label: "Remote" },
  ];

  const experienceOptions = [
    { value: "0", label: "Fresher (0 years)" },
    { value: "1", label: "1 year" },
    { value: "2", label: "2 years" },
    { value: "3", label: "3 years" },
    { value: "5", label: "5+ years" },
    { value: "10", label: "10+ years" },
  ];

  const educationOptions = [
    { value: "highschool", label: "High School" },
    { value: "diploma", label: "Diploma" },
    { value: "bachelor", label: "Bachelor's Degree" },
    { value: "master", label: "Master's Degree" },
    { value: "phd", label: "PhD" },
    { value: "any", label: "Any" },
  ];

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "chinese", label: "Chinese" },
    { value: "japanese", label: "Japanese" },
    { value: "arabic", label: "Arabic" },
    { value: "hindi", label: "Hindi" },
  ];

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Apply update
      onChange({ [name]: value });
      // Clear any errors related to this field
      if (errors[name]) {
        clearError(name);
      }
    },
    [onChange, errors, clearError]
  );

  const handleNegotiableChange = useCallback(
    (value) => {
      onChange({ negotiable: value === "yes" });
    },
    [onChange]
  );

  const handleSalaryChange = useCallback(
    (value) => {
      onChange({ salaryRange: value });

      if (errors.salaryRange) {
        clearError("salaryRange");
      }
    },
    [onChange, errors, clearError]
  );

  const handleDateChange = useCallback(
    (date) => {
      onChange({ applicationDeadline: date });

      if (errors.applicationDeadline) {
        clearError("applicationDeadline");
      }
    },
    [onChange, errors, clearError]
  );

  const handleLanguagesChange = useCallback(
    (languages) => {
      onChange({ languages });
    },
    [onChange]
  );

  const handleTagsChange = useCallback(
    (tags) => {
      onChange({ jobTags: tags });
    },
    [onChange]
  );

  return (
    <ReusableForm
      title="Salary & Info"
      maxWidth="max-w-[698px]"
      subtitle="Fill in the details below and find the right candidate."
    >
      <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Work Mode - Mandatory */}

          {/* Salary Range and Negotiable Option */}
          <div>
            <div className="mb-2 flex items-center justify-between"></div>
            <SalaryRangeInput
              onSalaryChange={handleSalaryChange}
              initialValue={formData.salaryRange}
            />
            {errors.salaryRange && (
              <p className="mt-1 text-sm text-red-500">{errors.salaryRange}</p>
            )}
          </div>
          <div>
            <label className="text-grayBlueText text-[15px] font-medium">Negotiable *</label>
            <RadioGroup
              name="negotiable"
              options={[
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ]}
              defaultValue={formData.negotiable ? "yes" : "no"}
              onChange={handleNegotiableChange}
              bordered={false}
              className="mt-2 flex-shrink-0"
            />
          </div>
          <div>
            <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
              Work Mode *
            </label>
            <Selecter
              name="workMode"
              value={formData.workMode}
              onChange={handleChange}
              options={workModeOptions}
              error={errors.workMode}
              placeholder="Select work mode"
            />
          </div>

          {/* Contact Person/Email - Mandatory */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Contact Email *
              </label>
              <InputField
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="Enter contact email"
                error={errors.contactEmail}
              />
            </div>
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Contact Number *
              </label>
              <InputField
                type="number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Enter contact number"
                error={errors.contactNumber}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Application Deadline *
              </label>
              <CustomDatePicker
                value={formData.applicationDeadline}
                onChange={handleDateChange}
                minDate={new Date()}
                error={errors.applicationDeadline}
              />
            </div>

            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Education
              </label>
              <Selecter
                name="education"
                value={formData.education}
                onChange={handleChange}
                options={educationOptions}
                isOther={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Experience
              </label>
              <Selecter
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                options={experienceOptions}
                placeholder="Select required experience"
              />
            </div>

            {/* <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Number of Open Positions
              </label>
              <InputField
                type="number"
                name="openPositions"
                value={formData.openPositions}
                onChange={handleChange}
                placeholder="Enter number of positions"
                min="1"
              />
              </div> */}
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Required Languages
              </label>
              <Selecter
                name="requiredLanguages"
                value={formData.requiredLanguages}
                onChange={handleChange}
                options={languageOptions}
                isMulti={true}
                isOther={true}
              />
            </div>
          </div>

          {/* Languages */}

          <div>
            <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
              Number of Open Positions
            </label>
            <InputField
              type="number"
              name="numOfEmployee"
              value={formData.numOfEmployee}
              onChange={handleChange}
              placeholder="Enter number of applicants"
              min="1"
            />
          </div>

          {/* Job Tags/Keywords */}
          <div>
            <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
              Job Tags/Keywords
            </label>
            <SkillsInput
              onSkillsChange={handleTagsChange}
              initialSkills={formData.jobTags || []}
              placeholder="Enter job tags or keywords"
            />
          </div>
        </div>

        <div className="flex gap-4.5 pt-2">
          <button type="button" className="btn-white-fill" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-fill">
            Next
          </button>
        </div>
      </form>
    </ReusableForm>
  );
};

export default SalaryAndInfo;
