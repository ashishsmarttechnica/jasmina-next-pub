"use client";

import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import SalaryRangeInput from "@/common/SalaryRangeInput";
import Selecter from "@/common/Selecter";
import TimePicker from "@/common/TimePicker";
import ReusableForm from "@/components/form/ReusableForm";
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

  const genderOptions = [
    { value: "lgbtq", label: "LGBTQ" },
    { value: "nonlgbtq", label: "NonLGBTQ" },
    { value: "any", label: "Any" },
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

  return (
    <ReusableForm
      title="Salary & Info"
      maxWidth="max-w-[698px]"
      subtitle="Fill in the details below and find the right candidate."
    >
      <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <SalaryRangeInput
              onSalaryChange={handleSalaryChange}
              initialValue={formData.salaryRange}
            />
            {errors.salaryRange && (
              <p className="mt-1 text-sm text-red-500">{errors.salaryRange}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Work Hours
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <TimePicker
                    name="workHoursFrom"
                    value={formData.workHoursFrom}
                    onChange={handleChange}
                    error={errors.workHoursFrom}
                  />
                </div>
                <span className="text-grayBlueText font-medium">to</span>
                <div className="flex-1">
                  <TimePicker
                    name="workHoursTo"
                    value={formData.workHoursTo}
                    onChange={handleChange}
                    error={errors.workHoursTo}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Application Deadline
              </label>
              <CustomDatePicker
                value={formData.applicationDeadline}
                onChange={handleDateChange}
                minDate={new Date()}
                error={errors.applicationDeadline}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Gender Preference
              </label>
              <Selecter
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleChange}
                options={genderOptions}
                placeholder="Select gender preference"
                error={errors.genderPreference}
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
                // label="Education"
                error={errors.education}
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
                error={errors.experience}
              />
            </div>

            <div>
              <label className="text-grayBlueText mb-2 block text-[15px] font-medium">
                Applicants
              </label>
              <InputField
                // label="Applicants"
                type="number"
                name="applicants"
                value={formData.applicants}
                onChange={handleChange}
                placeholder="Enter number of applicants"
                min="1"
                error={errors.applicants}
              />
            </div>
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
