import { useTranslations } from "next-intl";
import { useState } from "react";

const useInterviewValidation = () => {
  const [errors, setErrors] = useState({});
  const t = useTranslations("Interview");

  const validateForm = (formData) => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Date validation
    if (!formData.date) {
      newErrors.date = "Please select a date";
    } else if (new Date(formData.date).setHours(0, 0, 0, 0) < today.getTime()) {
      newErrors.date = "Please select a current or future date";
    }

    // Start time validation
    if (!formData.startTime) {
      newErrors.startTime = "Start time is required";
    }

    // Address validation
    if (!formData.address?.trim()) {
      newErrors.address = "Address is required";
    }

    // Time zone validation
    if (!formData.timeZone) {
      newErrors.timeZone = "Time zone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name, value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let error = "";

    switch (name) {
      case "date":
        if (!value) error = "Please select a date";
        else if (new Date(value).setHours(0, 0, 0, 0) < today.getTime())
          error = "Please select a current or future date";
        break;

      case "startTime":
        if (!value) error = "Start time is required";
        break;

      case "address":
        if (!value?.trim()) error = "Address is required";
        break;

      case "timeZone":
        if (!value) error = "Time zone is required";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  return { errors, setErrors, validateForm, validateField, clearFieldError };
};

export default useInterviewValidation;
