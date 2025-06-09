import { useState } from "react";

const useRequirementsValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.description?.trim()) {
      newErrors.description = "Job description is required";
    }

    // Not validating seniorityLevel since it has a default value

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

  return {
    errors,
    setErrors,
    validateForm,
    clearError
  };
};

export default useRequirementsValidation;