"use client";
import InputField from "@/common/InputField";
import LocationSelector from "@/common/LocationSelector";
import Selecter from "@/common/Selecter";
import ReusableForm from "@/components/form/ReusableForm";
import useJobDetailsValidation from "@/hooks/validation/job/useJobDetailsValidation";
import useLocationStore from "@/store/location.store";
import { useCallback, useEffect, useState } from "react";
import { useDepartmentOptions, useEmployeTypeOptions } from "@/utils/selectOptions";

const AddJobDetails = ({ formData, onChange, errors: parentErrors, onNext }) => {
  const { errors, setErrors, validateForm, clearError, clearLocationErrors } =
    useJobDetailsValidation();
  const [locationComplete, setLocationComplete] = useState(false);
  const { resetLocation } = useLocationStore();

  // Check if location is complete with proper format (city, state, country)
  useEffect(() => {
    if (formData.jobLocation) {
      const parts = formData.jobLocation.split(",").map((part) => part.trim());
      setLocationComplete(parts.length === 3 && parts[0] && parts[1] && parts[2]);
    } else {
      setLocationComplete(false);
    }
  }, [formData.jobLocation]);

  // Reset location store when component unmounts
  useEffect(() => {
    return () => {
      resetLocation();
    };
  }, [resetLocation]);

  // Merge parent errors with local errors for display
  useEffect(() => {
    if (parentErrors) {
      setErrors((prev) => ({ ...prev, ...parentErrors }));
    }
  }, [parentErrors, setErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm(formData, locationComplete)) {
      return;
    }

    onNext();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onChange({
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is changed
    if (errors[name]) {
      clearError(name);
    }
  };

  // Get the options for the employment type and department
  const employetypeOptions = useEmployeTypeOptions();
  const departmentOptions = useDepartmentOptions();

  const handleLocationChange = useCallback(
    (val) => {
      if (val) {
        onChange({ jobLocation: val });

        // Check if the location has all three parts
        const parts = val.split(",").map((part) => part.trim());
        if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
          setLocationComplete(true);

          // Clear location error
          clearError("jobLocation");
        } else {
          setLocationComplete(false);
        }
      }
    },
    [onChange, clearError]
  );

  // Handle location field change to clear errors
  const handleLocationFieldChange = useCallback(
    (fieldName) => {
      // This is called when an individual part of the location changes
      if (errors.jobLocation) {
        clearError("jobLocation");
      }
    },
    [errors.jobLocation, clearError]
  );

  const toggleRemote = useCallback(() => {
    onChange({ isRemote: !formData.isRemote });
    if (!formData.isRemote) {
      // If switching to remote, clear location-related fields
      onChange({
        jobLocation: "",
        jobArea: "",
      });
      setLocationComplete(false);

      // Reset location store to fix the reset issue
      resetLocation();

      // Clear location-related errors
      clearLocationErrors();
    }
  }, [formData.isRemote, onChange, resetLocation, clearLocationErrors]);

  return (
    <ReusableForm
      title={"Post a New Job"}
      maxWidth="max-w-[698px]"
      subtitle={"Fill in the details below and find the right candidate."}
    >
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <InputField
            label={`Job Title *`}
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder={"Enter job title"}
            parentClassName="col-span-2"
            error={errors.jobTitle}
          />

          <Selecter
            name="jobType"
            label={`Employment Type *`}
            placeholder={"Select Employment Type"}
            value={formData.jobType}
            onChange={handleChange}
            options={employetypeOptions}
            error={errors.jobType}
          />
          <Selecter
            name="department"
            label={`Department *`}
            placeholder={"Select department"}
            value={formData.department}
            onChange={handleChange}
            options={departmentOptions}
            error={errors.department}
          />

          <div className="col-span-2 mb-2 flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <label htmlFor="isRemote" className="flex items-center gap-2 font-medium text-gray-700">
              <span className="text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Remote Job
            </label>
            <button
              type="button"
              onClick={toggleRemote}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.isRemote ? "bg-primary" : "bg-gray-300"}`}
              role="switch"
              aria-checked={formData.isRemote}
            >
              <span className="sr-only">Remote job toggle</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.isRemote ? "translate-x-5" : "translate-x-0"}`}
              />
            </button>
          </div>

          {!formData.isRemote && (
            <>
              <div className="col-span-2 space-y-1">
                <label className="block text-sm font-medium text-gray-700">{`Job Location *`}</label>
                <LocationSelector
                  value={formData.jobLocation}
                  onChange={handleLocationChange}
                  onFieldChange={handleLocationFieldChange}
                  error={errors.jobLocation}
                />
              </div>

              <InputField
                name="jobArea"
                label={`Area *`}
                value={formData.jobArea}
                onChange={handleChange}
                placeholder={"Enter specific location (e.g., downtown, business district)"}
                parentClassName="col-span-2"
                error={errors.jobArea}
              />
            </>
          )}

          <div className="col-span-2">
            <button type="submit" className="btn-fill">
              Next
            </button>
          </div>
        </div>
      </form>
    </ReusableForm>
  );
};

export default AddJobDetails;
