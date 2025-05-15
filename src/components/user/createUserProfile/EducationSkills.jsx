import React, { useState, useEffect } from "react";
import ReusableForm from "../../form/ReusableForm";
import useEducationSkillsForm from "@/hooks/validation/user/useEducationSkillsForm";
import EducationSection from "./education/EducationSection";
import SkillsSection from "./education/SkillsSection";
import LanguagesSection from "./education/LanguagesSection";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import useAuthStore from "@/store/auth.store";
import { useTranslations } from "next-intl";
import { Loader } from "rsuite";

const EducationSkills = ({ setActiveTab }) => {
  const { user, setUser } = useAuthStore();
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();
  const t = useTranslations("UserProfile.education");
  const proficiencyOptions = [
    { label: `${t("proficiencyOptions.beginner")}`, value: "beginner" },
    { label: `${t("proficiencyOptions.intermediate")}`, value: "intermediate" },
    { label: `${t("proficiencyOptions.advanced")}`, value: "advanced" },
    { label: `${t("proficiencyOptions.expert")}`, value: "expert" },
  ];

  const [formData, setFormData] = useState({
    educationList: [{ degree: "", passingyear: "", schoolname: "", board: "" }],
    skillsList: [{ skill: "", proficiency: "", experience: "", category: "" }],
    languagesList: [{ languages: "", proficiency: "" }],
  });

  const { errors, validateForm, clearFieldError } = useEducationSkillsForm();

  const addSection = (type) => {
    setFormData((prevData) => {
      if (type === "education") {
        return {
          ...prevData,
          educationList: [
            ...prevData.educationList,
            { degree: "", passingyear: "", schoolname: "", board: "" },
          ],
        };
      }
      if (type === "skills") {
        return {
          ...prevData,
          skillsList: [
            ...prevData.skillsList,
            { skill: "", proficiency: "", experience: "", category: "" },
          ],
        };
      }
      if (type === "languages") {
        return {
          ...prevData,
          languagesList: [
            ...prevData.languagesList,
            { languages: "", proficiency: "" },
          ],
        };
      }
      return prevData;
    });
  };

  const removeSection = (type, index) => {
    setFormData((prevData) => {
      if (type === "education") {
        return {
          ...prevData,
          educationList: prevData.educationList.filter((_, i) => i !== index),
        };
      }
      if (type === "skills") {
        return {
          ...prevData,
          skillsList: prevData.skillsList.filter((_, i) => i !== index),
        };
      }
      if (type === "languages") {
        return {
          ...prevData,
          languagesList: prevData.languagesList.filter((_, i) => i !== index),
        };
      }
      return prevData;
    });
  };

  const handleChange = (
    type,
    index,
    name,
    value,
    isSelect = false,
    selectType
  ) => {
    setFormData((prevData) => {
      const updatedList = [...prevData[type]];
      updatedList[index] = { ...updatedList[index], [name]: value };

      if (isSelect) {
        clearFieldError(`${selectType}-${index}-${name}`);
      }

      return { ...prevData, [type]: updatedList };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    const submitData = new FormData();
    formData.educationList.forEach((edu, index) => {
      submitData.append(`education[${index}][degreeName]`, edu.degree);
      submitData.append(`education[${index}][passingYear]`, edu.passingyear);
      submitData.append(`education[${index}][schoolOrCollege]`, edu.schoolname);
      submitData.append(`education[${index}][universityOrBoard]`, edu.board);
    });

    formData.skillsList.forEach((skill, index) => {
      submitData.append(`skills[${index}][name]`, skill.skill);
      submitData.append(
        `skills[${index}][proficiencyLevel]`,
        skill.proficiency
      );
      submitData.append(
        `skills[${index}][yearsOfExperience]`,
        skill.experience
      );
      submitData.append(`skills[${index}][category]`, skill.category);
    });

    formData.languagesList.forEach((lang, index) => {
      submitData.append(`languages[${index}][name]`, lang.languages);
      submitData.append(`languages[${index}][proficiency]`, lang.proficiency);
    });

    submitData.append("steps", 3);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          setActiveTab(3);
        }
      },
    });
  };

  useEffect(() => {
    if (user) {
      const { education, skills, languages } = user;
      setFormData((prev) => ({
        ...prev,
        educationList:
          education?.length > 0
            ? education.map((edu) => ({
                degree: edu.degreeName || "",
                passingyear: edu.passingYear || "",
                schoolname: edu.schoolOrCollege || "",
                board: edu.universityOrBoard || "",
              }))
            : [{ degree: "", passingyear: "", schoolname: "", board: "" }],

        skillsList:
          skills?.length > 0
            ? skills.map((skill) => ({
                skill: skill.name || "",
                proficiency: skill.proficiencyLevel || "",
                experience: skill.yearsOfExperience || "",
                category: skill.category || "",
              }))
            : [{ skill: "", proficiency: "", experience: "", category: "" }],

        languagesList:
          languages?.length > 0
            ? languages.map((lang) => ({
                languages: lang.name || "",
                proficiency: lang.proficiency || "",
              }))
            : [{ languages: "", proficiency: "" }],
      }));
    }
  }, [user]);

  return (
    <ReusableForm
      title={t("title")}
      maxWidth="max-w-[698px]"
      subtitle={t("subTitle")}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Education Section */}
        <EducationSection
          educationList={formData.educationList}
          addSection={addSection}
          removeSection={removeSection}
          handleChange={handleChange}
          errors={errors}
          clearFieldError={clearFieldError}
        />

        {/* Skills Section */}
        <SkillsSection
          skillsList={formData.skillsList}
          proficiencyOptions={proficiencyOptions}
          addSection={addSection}
          removeSection={removeSection}
          handleChange={handleChange}
          errors={errors}
          clearFieldError={clearFieldError}
        />

        {/* Languages Section */}
        <LanguagesSection
          languagesList={formData.languagesList}
          proficiencyOptions={proficiencyOptions}
          addSection={addSection}
          removeSection={removeSection}
          handleChange={handleChange}
          errors={errors}
          clearFieldError={clearFieldError}
        />

        <div className="block space-y-4">
          <button className="btn-fill">
            {" "}
            {isPending ? (
              <div>
                <Loader inverse />
              </div>
            ) : (
              `${t("Next")} >`
            )}
          </button>
        </div>
      </form>
    </ReusableForm>
  );
};

export default EducationSkills;
