import { useTranslations } from "next-intl";
import React, { useState } from "react";

const useProfileForm = () => {
  const [errors, setErrors] = useState({});
  const t = useTranslations("UserProfile.profile");

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.fullName) {
      newErrors.fullName = "Full Name is required";
    }

    // Username validation
    if (!formData.userName) {
      newErrors.userName = "User Name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, "");
      if (phoneDigits.length < 10 || phoneDigits.length > 15) {
        newErrors.phone = "enter phone number between 10 to 15 digits";
      }
    }

    // CV validation
    if (!formData.cv) {
      newErrors.cv = "Please upload your CV";
    } else {
      const validExt = ["pdf", "doc", "docx", "tex", "webp"];
      const ext = formData.cv.name.split(".").pop()?.toLowerCase() || "";
      if (!validExt.includes(ext)) {
        newErrors.cv = "Invalid file format. Allowed: PDF, DOC, DOCX, TEX, WEBP";
      }
    }

    // Location validation
    if (!formData.location) {
      newErrors.location = "Location is required.";
    }

    // Experience validation
    if (!formData.experience) {
      newErrors.experience = "Please specify your experience";
    } else if (isNaN(Number(formData.experience))) {
      newErrors.experience = "Experience must be a number";
    }

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
