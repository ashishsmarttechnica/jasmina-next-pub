"use client";
import { applyJob } from "@/api/job.api";
import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import LocationInput from "@/common/LocationInput";
import useProfileForm from "@/hooks/validation/user/Job/useProfileForm";
import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

import { FiUpload } from "react-icons/fi";

const ApplyNowForm = ({ jobId }) => {
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
  const router = useRouter();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validateForm(formData)) return;

    if (!selectedFile) {
      setError("Please upload a resume file (PDF, DOC, DOCX, TEX).");
      return;
    }

    const validExtensions = [".pdf", ".doc", ".docx", ".tex", ".webp"];
    const fileExtension = selectedFile?.name.split(".").pop();

    if (!validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      setError("Invalid file format. Please upload a valid resume file.");
      return;
    }

    const submitData = new FormData();
    submitData.append("jobId", jobId);
    submitData.append("userId", user?._id);
    submitData.append("fullName", formData.fullName);
    submitData.append("userName", formData.userName);
    submitData.append("phone", formData.phone);
    submitData.append("email", formData.email);
    submitData.append("location", formData.location);
    submitData.append("dateOfBirth", formData.dob);
    submitData.append("expYears", formData.experience);
    submitData.append("appliedCV", selectedFile);

    try {
      const response = await applyJob(submitData);
      if (response.success) {
        toast.success(response.message);
        // Reset form after successful submission
        setFormData({
          fullName: "",
          userName: "",
          phone: "",
          email: "",
          location: "",
          dob: "",
          cv: null,
          experience: "",
        });
        setSelectedFile(null);

        // Navigate to applied-jobs page after success
        setTimeout(() => {
          router.push("/jobs/applied-jobs");
        }, 1500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mx-auto h-fit w-full rounded-lg bg-white p-2 text-[14px] font-normal shadow-sm sm:p-[20px] xl:max-w-[547px]">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4 text-left text-[16px] font-medium text-black">
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
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
          </div>

          <CustomDatePicker
            value={formData.dob}
            onChange={handleDateChange}
            error={errors.dob}
            label="Date of Birth"
          />
        </div>

        <div className="mb-2">
          <label className="my-5 block text-[16px] font-medium text-black">
            Add a CV for the employer
          </label>
        </div>

        <div className="relative flex h-22 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[0.78px] border-[#CAB7CC]/[75%]">
          <label
            htmlFor="cv"
            className="flex cursor-pointer flex-row items-center justify-center gap-2 text-[14px] font-medium text-[#0F8200]"
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
            className="absolute inset-0 cursor-pointer opacity-0"
          />

          <p className="mt-2 text-[12px] text-gray-600">
            {selectedFile ? ` ${selectedFile.name}` : "Allowed: PDF, DOC, DOCX, TEX, WEBP"}
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="mb-2 flex flex-col">
          <label htmlFor="experience" className="mt-1 py-1 text-[14px] font-medium text-black">
            How many years of UI/UX experience do you have?*
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            id="experience"
            className="mt-1 w-full max-w-[196px] rounded-lg border-[0.78px] border-[#CAB7CC]/[75%] p-2 outline-none"
          />
        </div>

        <button
          type="submit"
          className="hover:text-primary bg-primary hover:border-primary hover:bg-secondary/50 mt-3 w-full rounded-md border border-transparent p-1 text-[18px] font-medium text-white transition-all duration-100 ease-in sm:mt-5 sm:p-2 sm:text-[14px]"
        >
          Submit your Application
        </button>
      </form>
    </div>
  );
};

export default ApplyNowForm;
