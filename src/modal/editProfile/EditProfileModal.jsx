"use client";

import Uploadimg from "@/assets/form/Uploadimg.png";
import ImageUploader from "@/common/ImageUploader";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import useEditProfileValidation from "@/hooks/validation/user/useEditProfileValidation";
import getImg from "@/lib/getImg";
import useAuthStore from "@/store/auth.store";
import useLocationStore from "@/store/location.store";
import { useProficiencyOptions, useSkillCategoryOptions } from "@/utils/selectOptions";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "rsuite";
import EducationSkillsForm from "./EducationSkillsForm";
import JobPreferencesForm from "./JobPreferencesForm";
import PersonalInformationForm from "./PersonalInformationForm";

const EditProfileModal = ({ open, onClose, descriptionData }) => {
  const { user, setUser } = useAuthStore();

  // console.log(user?.profile.availabilty, "sdfdsf23423423");

  const { mutate: updateProfile, isPending, error } = useUpdateProfile();
  const t = useTranslations("UserProfile.education");
  const { resetLocation } = useLocationStore();

  // Use the centralized validation hook
  const { errors, validateAll, clearError, clearAllErrors } = useEditProfileValidation();

  // Refs to collect data from children
  const personalRef = useRef();
  const jobRef = useRef();
  const educationSkillsRef = useRef();

  // Image state
  const [selectedImage, setSelectedImage] = useState(Uploadimg);
  const [selectedUserImageFile, setSelectedUserImageFile] = useState(null);
  // const [availability, setAvailability] = useState(descriptionData?.profile?.availabilty || "");

  // Proficiency options for skills/languages
  const proficiencyOptions = useProficiencyOptions();
  const categoryOptions = useSkillCategoryOptions();

  // const handleAvailabilityChange = (newAvailability) => {
  //   setAvailability(newAvailability);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get data from all forms
    const personalData = personalRef.current?.getData();
    const preferencesData = jobRef.current?.getData();
    const educationData = educationSkillsRef.current?.getData();

    // Validate all forms using the centralized validation
    const isValid = validateAll(personalData, preferencesData, educationData);

    // If validation fails, stop form submission
    if (!isValid) {
      console.log("Form validation failed:", errors);
      return;
    }

    // Clear all errors if validation passes
    clearAllErrors();

    const formData = new FormData();

    // Profile fields
    formData.append("profile.fullName", personalData.fullName);
    formData.append("profile.userName", personalData.userName);
    formData.append("profile.gender", personalData.gender);
    formData.append("profile.dob", personalData.dob);
    formData.append("profile.phone", personalData.phone);
    formData.append("profile.location", personalData.location);
    formData.append("profile.pronounce", personalData.pronoun);
    formData.append("profile.isPrivate", personalData.isPrivate);
    // formData.append("profile.availabilty", personalData.availabilty);
    formData.append("profile.linkedin", personalData.linkedin);
    formData.append("profile.instagram", personalData.instagram);
    formData.append("profile.x", personalData.x);
    formData.append("profile.facebook", personalData.facebook);
    formData.append("profile.email", personalData.email);

    // Preferences fields - only append if availability is not "Not Available"
    // if (personalData.availabilty !== "Not Available") {
    formData.append("preferences.jobRole", preferencesData.jobRole);
    formData.append("preferences.jobType", preferencesData.jobType);
    formData.append("preferences.expectedSalaryRange", preferencesData.salaryRange);
    formData.append("preferences.currency", preferencesData.currency);
    formData.append("preferences.availableFrom", preferencesData.joindate);
    formData.append("preferences.preferredLocation", preferencesData.workLocation);
    formData.append("preferences.yearsOfExperience", preferencesData.experience);
    if (preferencesData.industry)
      formData.append("preferences.preferredIndustry", preferencesData.industry);
    // }

    // Education
    educationData.educationList?.forEach((edu, i) => {
      formData.append(`education[${i}][degreeName]`, edu.degree);
      formData.append(`education[${i}][passingYear]`, edu.passingyear);
      formData.append(`education[${i}][schoolOrCollege]`, edu.schoolname);
      formData.append(`education[${i}][universityOrBoard]`, edu.board);
    });

    // Skills
    educationData.skillsList?.forEach((skill, i) => {
      formData.append(`skills[${i}][name]`, skill.skill);
      formData.append(`skills[${i}][proficiencyLevel]`, skill.proficiency);
      formData.append(`skills[${i}][yearsOfExperience]`, skill.experience);
      formData.append(`skills[${i}][category]`, skill.category);
    });

    // Languages
    educationData.languagesList?.forEach((lang, i) => {
      formData.append(`languages[${i}][name]`, lang.languages);
      formData.append(`languages[${i}][proficiency]`, lang.proficiency);
    });

    // Experience
    educationData.experienceList?.forEach((exp, i) => {
      formData.append(`experience[${i}][companyName]`, exp.companyName);
      formData.append(`experience[${i}][jobTitle]`, exp.role);
      formData.append(`experience[${i}][startDate]`, exp.startDate);
      if (exp.endDate) formData.append(`experience[${i}][endDate]`, exp.endDate);
      formData.append(`experience[${i}][location]`, exp.location);
      formData.append(`experience[${i}][position]`, exp.position);
    });

    // Photo
    if (selectedUserImageFile instanceof File && selectedImage !== Uploadimg) {
      formData.append("profile.photo", selectedUserImageFile);
    }

    updateProfile(formData, {
      onSuccess: (res) => {
        if (res.success) {
          onClose();
          window.location.reload();
        }
      },
    });
  };

  useEffect(() => {
    if (descriptionData?.profile?.photo) {
      setSelectedImage(getImg(descriptionData?.profile?.photo));
    }
  }, [descriptionData]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="md"
      className="mx-auto w-full max-w-lg rounded-2xl !p-0"
    >
      <Modal.Header className="flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white px-2 py-2 md:px-6 md:py-4">
        <Modal.Title className="text-xl font-bold text-gray-800">{t("editProfile")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="space-y-6 bg-white px-2 py-2 md:px-6 md:py-4">
        <div className="mt-2 flex flex-col items-center justify-center gap-2 sm:mt-0">
          <div className="relative">
            <ImageUploader
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setSelectedImageFile={setSelectedUserImageFile}
              width={112}
              height={112}
              className="border-primary-500 h-28 w-28 rounded-full border-4 object-cover shadow-lg"
              priority={true}
            />
          </div>
        </div>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <PersonalInformationForm
            ref={personalRef}
            initialData={descriptionData?.profile}
            email={descriptionData?.email}
            errors={errors?.personal || {}}
            clearFieldError={clearError}
            // onAvailabilityChange={handleAvailabilityChange}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          />
        </div>
        {/* {availability !== "Not Available" && ( */}
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <JobPreferencesForm
            ref={jobRef}
            initialData={descriptionData?.preferences}
            errors={errors?.job || {}}
            clearFieldError={clearError}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          />
        </div>
        {/* )} */}
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <EducationSkillsForm
            categoryOptions={categoryOptions}
            ref={educationSkillsRef}
            initialData={{
              education: descriptionData?.education,
              skills: descriptionData?.skills,
              languages: descriptionData?.languages,
              experience: descriptionData?.experience,
            }}
            errors={errors?.education || {}}
            clearFieldError={clearError}
            proficiencyOptions={proficiencyOptions}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="flex items-center justify-end gap-3 rounded-b-2xl border-t border-gray-200 bg-white px-2 py-2 md:px-6 md:py-4">
        <Button
          onClick={onClose}
          appearance="subtle"
          className="rounded-lg border border-gray-300 px-6 py-2 text-gray-600 transition hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          appearance="primary"
          className="bg-primary-600 hover:bg-primary-700 rounded-lg px-6 py-2 font-semibold text-white shadow transition"
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
