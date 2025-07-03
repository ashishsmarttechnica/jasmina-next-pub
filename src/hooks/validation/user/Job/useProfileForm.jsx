import { useTranslations } from "next-intl";
import { useState } from "react";

const useProfileForm = () => {
  const [errors, setErrors] = useState({});
  const t = useTranslations("UserProfile.profile");

  const validateForm = (formData) => {
    const newErrors = {};

    // Required field validations

    // Full Name validation (Required)
    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    // Email validation (Required)
    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // CV validation (Required)
    if (!formData.cv && !formData.appliedCV) {
      newErrors.cv = "Please upload a resume file (PDF, DOC, DOCX, TEX).";
    } else if (formData.cv || formData.appliedCV) {
      const file = formData.cv || formData.appliedCV;
      const validExt = ["pdf", "doc", "docx", "tex", "webp"];
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (!validExt.includes(ext)) {
        newErrors.cv = "Invalid file format. Allowed: PDF, DOC, DOCX, TEX, WEBP";
      }
    }

    // Optional fields don't need validation:
    // - phone
    // - linkedinUrl
    // - portfolioUrl
    // - pronouns
    // - location
    // - preferredStartDate
    // - currentAvailability
    // - salaryExpectationMin
    // - salaryExpectationMax
    // - coverLetter
    // - additionalFiles

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[fieldName];
      return copy;
    });
  };

  return { errors, setErrors, validateForm, clearFieldError };
};

export default useProfileForm;
