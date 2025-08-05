import { useState } from "react";

const useSalaryInfoValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    // Work Mode validation (mandatory) - only if not remote
    if (!formData.isRemote && !formData.workMode) {
      newErrors.workMode = "Work mode is required";
    }

    // Contact Email validation (mandatory)
    // if (!formData.contactEmail) {
    //   newErrors.contactEmail = "Contact email is required";
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
    //   newErrors.contactEmail = "Please enter a valid email address";
    // }

    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10,15}$/.test(formData.contactNumber.replace(/[+\s-]/g, ""))) {
      newErrors.contactNumber = "Please enter a valid phone number (10-15 digits)";
    }

    // Salary validation (mandatory)
    if (!formData.salaryRange) {
      newErrors.salaryRange = "Salary range is required";
    } else if (!formData.salaryRange) {
      // Check if the salary format is correct based on the pattern
      const isRangeFormat = /^\d+\s*-\s*\d+\s+[A-Za-z]+$/.test(formData.salaryRange); // e.g., 5000 - 8000 INR
      const isLpaFormat = /^\d+\s*-\s*\d+\s+LPA$/i.test(formData.salaryRange); // e.g., 5-7 LPA

      if (!isRangeFormat && !isLpaFormat) {
        newErrors.salaryRange =
          "Please enter a valid salary format (e.g., 5000 - 8000 INR or 5-7 LPA)";
      }
    }

    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = "Application deadline is required";
    } else {
      const deadlineDate = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.applicationDeadline = "Deadline cannot be in the past";
      }
    }

    // Optional fields - no validation required
    // - education
    // - experience
    // - openPositions
    // - languages
    // - tags

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

export default useSalaryInfoValidation;
