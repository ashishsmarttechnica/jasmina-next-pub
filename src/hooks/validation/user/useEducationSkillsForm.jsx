import { useTranslations } from "next-intl";
import { useState } from "react";

const useEducationSkillsForm = () => {
  const [errors, setErrors] = useState({});
  const t = useTranslations("UserProfile.education");
  const validateForm = ({ educationList, skillsList, languagesList, experienceList }) => {
    const newErrors = {};

    educationList.forEach((edu, index) => {
      if (!edu.degree) newErrors[`education-${index}-degree`] = t("degreeError");
      if (!edu.passingyear) newErrors[`education-${index}-passingyear`] = t("passingYearError");
      if (!edu.schoolname) newErrors[`education-${index}-schoolname`] = t("schoolNameError");
      if (!edu.board) newErrors[`education-${index}-board`] = t("boardError");
    });

    skillsList.forEach((skill, index) => {
      if (!skill.skill) newErrors[`skill-${index}-skill`] = t("skillError");
      if (!skill.proficiency) newErrors[`skill-${index}-proficiency`] = t("proficiencyError");
      if (!skill.experience) newErrors[`skill-${index}-experience`] = t("experienceError");
      if (!skill.category) newErrors[`skill-${index}-category`] = t("categoryError");
    });

    languagesList.forEach((lang, index) => {
      if (!lang.languages) newErrors[`language-${index}-languages`] = t("languageError");
      if (!lang.proficiency) newErrors[`language-${index}-proficiency`] = t("proficiencyError");
    });

    experienceList.forEach((exp, index) => {
      if (!exp.companyName) newErrors[`experience-${index}-companyName`] = t("companyNameError");
      if (!exp.role) newErrors[`experience-${index}-role`] = t("roleError");
      if (!exp.startDate) newErrors[`experience-${index}-startDate`] = t("startDateError");
      if (!exp.endDate) newErrors[`experience-${index}-endDate`] = t("endDateError");
      if (!exp.location) newErrors[`experience-${index}-location`] = t("locationError");

      // Date validation: Check if end date is before start date
      if (exp.startDate && exp.endDate) {
        const startDate = new Date(exp.startDate);
        const endDate = new Date(exp.endDate);
        if (endDate < startDate) {
          newErrors[`experience-${index}-endDate`] = t("endDateBeforeStartError");
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (fieldKey) => {
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[fieldKey];
      return updated;
    });
  };

  return { errors, validateForm, clearFieldError };
};

export default useEducationSkillsForm;
