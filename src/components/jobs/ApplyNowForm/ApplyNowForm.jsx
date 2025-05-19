"use client";
import React, { useState } from "react";
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

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.userName) newErrors.userName = "User Name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.cv) newErrors.cv = "Please upload your CV";
    if (!formData.experience) newErrors.experience = "Experience is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data submitted:", formData);
    }
  };

  return (
    <div className="w-full h-fit  xl:max-w-[547px]  p-4 sm:p-[20px] mx-auto bg-white text-[#888DA8] font-normal text-[14px] rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <h2 className="text-left -mt-3 text-black text-[16px]  font-medium  ">
          Add your contact information
        </h2>

        <div className="mb-4">
          <label htmlFor="fullName" className="">
            Full Name*
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            id="fullName"
            className="w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.fullName}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="userName" className="">
            User Name*
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleInputChange}
            id="userName"
            className="w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
          {errors.userName && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.userName}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="">
            Phone*
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            id="phone"
            className="w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
          {errors.phone && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="">
            Email*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            id="email"
            className="w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.email}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="">
            Location*
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            id="location"
            className="w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
          {errors.location && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.location}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="">
            Date of Birth*
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            id="dob"
            className="w-full p-2 mt-1 border-[0.78px] border-[#CAB7CC]/[75%] outline-none rounded-lg"
          />
          {errors.dob && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.dob}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-medium text-[16px] my-4 text-black">
            Add a CV for the employer
          </label>

          <div className="w-full h-20 border-[#CAB7CC]/[75%] border-[0.78px] rounded-xl flex items-center justify-center relative cursor-pointer">
            <label
              htmlFor="cv"
              className="flex flex-row gap-2 items-center justify-center text-[#0F8200] font-medium text-[14px] cursor-pointer"
            >
              <FiUpload className="text-2xl" />
              Upload a CV
            </label>
            <input
              type="file"
              id="cv"
              name="cv"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          {formData.cv && (
            <p className="mt-2 text-sm text-gray-700">
              Selected file:{" "}
              <span className="font-medium">{formData.cv.name}</span>
            </p>
          )}

          {errors.cv && (
            <span className="text-red-500 text-sm mt-2 block">{errors.cv}</span>
          )}
        </div>

        <div className="mb-4 flex flex-col">
          <label
            htmlFor="experience"
            className="font-normal text-[14px] text-black py-1"
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
          {errors.experience && (
            <span className="text-red-500 text-sm mt-2 block">
              {errors.experience}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-2 px-5 py-1.5 outline-none bg-[#0F8200] text-white text-sm sm:text-base md:text-lg font-medium rounded-lg border border-transparent hover:bg-white hover:text-[#0F8200] hover:border-[#0F8200] transition-all duration-200 ease-in-out"
        >
          Submit your Application
        </button>
      </form>
    </div>
  );
};

export default ApplyNowForm;
