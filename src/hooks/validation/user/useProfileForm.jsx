import { useTranslations } from "next-intl";
import React, { useState } from "react";

const useProfileForm = () => {
  const [errors, setErrors] = useState({});
  const t=useTranslations("UserProfile.profile");

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.name) {
      newErrors.name = t("NameError");
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = t("UsernameError");
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = t("GenderError");
    } else if (!["male", "female", "other"].includes(formData.gender)) {
      newErrors.gender = t("InvalidGenderError");
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = t("DobError");
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = t("PhoneError");
    } else {
      // Remove any non-digit characters for validation
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10) {
        newErrors.phone = t("PhoneLength10Error");
      } else if (phoneDigits.length > 15) {
        newErrors.phone = t("PhoneLength15Error");
      }
    }

    // Location validation
    if (!formData.location) {
      newErrors.location = t("LocationError");
    }

    if (!formData.LinkedInLink) {
      newErrors.LinkedInLink = t("LinkedInLinkError");
    }
    // LinkedIn URL validation
    if (formData.LinkedInLink?.trim()) {
      try {
        const url = new URL(formData.LinkedInLink);
        if (!url.hostname.includes("linkedin.com")) {
          newErrors.LinkedInLink = t("InvalidLinkedInLinkError");
        }
      } catch {
        newErrors.LinkedInLink = t("InvalidLinkError");
      }
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

export default useProfileForm;
