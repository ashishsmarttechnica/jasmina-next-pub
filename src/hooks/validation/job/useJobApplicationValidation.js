import { useState } from "react";

const useJobApplicationValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    // Check if at least one contact method is provided
    if (!formData.email?.trim() && !formData.careerWebsite?.trim()) {
      newErrors.email = "Either email or career website is required";
      newErrors.careerWebsite = "Either email or career website is required";
    } else {
      // Validate email format if provided
      if (formData.email?.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }

      // Validate website URL if provided
      if (formData.careerWebsite?.trim()) {
        try {
          new URL(formData.careerWebsite);
        } catch (e) {
          newErrors.careerWebsite = "Please enter a valid website URL";
        }
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

  return {
    errors,
    setErrors,
    validateForm,
    clearError,
  };
};

export default useJobApplicationValidation;
