import { useState } from "react";

const useJobDetailsValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData, locationComplete) => {
    const newErrors = {};

    // Required fields validation
    if (!formData.jobTitle?.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!formData.jobType?.trim()) {
      newErrors.jobType = "Job type is required";
    }

    if (!formData.department?.trim()) {
      newErrors.department = "Department is required";
    }

    // Location validation (only if not remote)
    if (!formData.isRemote) {
      if (!formData.jobLocation?.trim()) {
        newErrors.jobLocation = "Job location is required";
      } else if (!locationComplete) {
        newErrors.jobLocation = "Please select country, state, and city";
      }

      if (!formData.jobArea?.trim()) {
        newErrors.jobArea = "Job area is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (fieldName) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  const clearLocationErrors = () => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors.jobLocation;
      delete updatedErrors.jobArea;
      return updatedErrors;
    });
  };

  return {
    errors,
    setErrors,
    validateForm,
    clearError,
    clearLocationErrors,
  };
};

export default useJobDetailsValidation;
