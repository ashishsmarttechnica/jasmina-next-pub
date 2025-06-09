import { useState } from "react";

const useSkillsValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.responsibilities?.trim()) {
      newErrors.responsibilities = "Responsibilities are required";
    }

    if (formData.skills?.length === 0) {
      newErrors.skills = "At least one skill is required";
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

  return {
    errors,
    setErrors,
    validateForm,
    clearError,
  };
};

export default useSkillsValidation;
