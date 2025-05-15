import { useTranslations } from "next-intl";
import { useState } from "react";

const usePreferencesForm = () => {
  const [errors, setErrors] = useState({});
  const t=useTranslations("UserProfile.preferences");

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.role) {
      newErrors.role = t("RoleError");
    }
    // if (!formData.jobType) {
    //   newErrors.jobType = "jobType is required.";
    // }
    if (!formData.salaryRange) {
      newErrors.salaryRange = t("SalaryRangeError");
    } else if (isNaN(formData.salaryRange) || formData.salaryRange <= 0) {
      newErrors.salaryRange = t("InvalidSalaryRangeError");
    }

    if (!formData.joindate) {
      newErrors.joindate = t("JoinDateError");
    }
    if (!formData.jobType) {
      newErrors.jobType = t("JobTypeError");
    }
    if (!formData.workLocation) {
      newErrors.workLocation = t("WorkLocationError");
    }
    if (!formData.experience) {
      newErrors.experience = t("ExperienceError");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  return { errors, setErrors, validateForm, clearFieldError };
};

export default usePreferencesForm;
