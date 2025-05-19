"use client";
import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import LocationInput from "@/common/LocationInput";
import useProfileForm from "@/hooks/validation/user/Job/useProfileForm";
import useAuthStore from "@/store/auth.store";
import React, { useCallback, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";

const ApplyNowForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    phone: "",
    email: "",
    location: "",
    dob: "",
    cv: null,
    experience: "",
  });
  const { errors, setErrors, validateForm, clearFieldError } = useProfileForm();
  const [error, setError] = useState("");
  const { user } = useAuthStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (value.trim() !== "") {
        clearFieldError(name);
      }
    },
    [clearFieldError]
  );

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePhoneChange = useCallback(
    (e) => {
      const { value } = e.target;
      const formattedValue = value.replace(/[^\d\s+\-()]/g, "");
      setFormData((prev) => ({ ...prev, phone: formattedValue }));
      if (formattedValue.trim() !== "") {
        clearFieldError("phone");
      }
    },
    [clearFieldError]
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      setSelectedFile(file);
      setError("");
    }
  };

  const handleDateChange = useCallback(
    (date) => {
      setFormData((prev) => ({ ...prev, dob: date }));
      clearFieldError("dob");
    },
    [clearFieldError]
  );

  const handleLocationChange = useCallback(
    (val) => {
      setFormData((prev) => ({ ...prev, location: val }));
      clearFieldError("location");
    },
    [clearFieldError]
  );

  const handleLocationDetect = useCallback(
    ({ city, state, country }) => {
      clearFieldError("location");
    },
    [clearFieldError]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    if (!selectedFile && user?.resume) {
      setActiveTab(4);
      return;
    }

    // ❌ No resume and no file selected
    if (!selectedFile && !user.resume) {
      setError(t("Please upload a resume file (PDF, DOC, DOCX, TEX)."));
      return;
    }

    const validExtensions = [".pdf", ".doc", ".docx", ".tex", ".webp"];
    const fileExtension = selectedFile?.name.split(".").pop();

    if (!validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      setError(t("Invalid file format. Please upload a valid resume file."));
      return;
    }
    const submitData = new FormData();
    submitData.append("profile.fullName", formData.fullName);
    submitData.append("profile.userName", formData.userName);
    submitData.append("profile.phone", formData.phone);
    submitData.append("profile.email", formData.email);
    submitData.append("profile.location", formData.location);
    submitData.append("profile.dob", formData.dob);
    submitData.append("profile.cv", formData.cv);
    submitData.append("profile.experience", formData.experience);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          setActiveTab(1);
        }
      },
    });
  };

  return (
    <div className="w-full h-fit  xl:max-w-[547px]  p-2 sm:p-[20px] mx-auto bg-white  font-normal text-[14px] rounded-lg shadow-sm">
      <form onSubmit={handleSubmit}>
        <h2 className="text-left  mb-4 text-black text-[16px]  font-medium  ">
          Add your contact information
        </h2>

        <div className="grid grid-cols-1 gap-y-2.5">
          <InputField
            label="FullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />

          <InputField
            label="UserName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            error={errors.userName}
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            error={errors.phone}
            type="tel"
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />

          <div className="space-y-1">
            <LocationInput
              value={formData.location}
              onChange={handleLocationChange}
              onLocationDetect={handleLocationDetect}
              error={errors.location}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          <CustomDatePicker
            value={formData.dob}
            onChange={handleDateChange}
            error={errors.dob}
            label="Date of Birth"
          />
        </div>

        <div className="mb-2">
          <label className="block font-medium text-[16px] my-5 text-black">
            Add a CV for the employer
          </label>
        </div>

        <div className="w-full h-22 border-[#CAB7CC]/[75%] border-[0.78px] rounded-xl flex flex-col items-center justify-center relative cursor-pointer">
          <label
            htmlFor="cv"
            className="flex flex-row gap-2 items-center justify-center text-[#0F8200] font-medium text-[14px] cursor-pointer"
          >
            <div onClick={handleFileButtonClick}>
              <FiUpload className="text-2xl" />
            </div>
            Upload a CV
          </label>

          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx,.tex,.webp"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <p className="mt-2 text-[12px] text-gray-600">
            {selectedFile
              ? ` ${selectedFile.name}`
              : "Allowed: PDF, DOC, DOCX, TEX, WEBP"}
          </p>
          {error && <p className="text-sm text-red-500 ">{error}</p>}
        </div>

        <div className="mb-2 flex flex-col">
          <label
            htmlFor="experience"
            className="font-medium text-[14px] mt-1 text-black py-1"
          >
            How many years of UI/UX experience do you have?*
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            id="experience"
            className="max-w-[196px] w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-3 sm:mt-5 p-1 hover:text-primary sm:p-2 bg-primary transition-all duration-100 ease-in border border-transparent hover:border-primary hover:bg-secondary/50 text-white rounded-md text-[18px] sm:text-[14px] font-medium"
        >
          Submit your Application
        </button>
      </form>
    </div>
  );
};

export default ApplyNowForm;
