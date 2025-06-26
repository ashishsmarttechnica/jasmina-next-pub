"use client";
import { applyJob } from "@/api/job.api";
import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import LocationInput from "@/common/LocationInput";
import useProfileForm from "@/hooks/validation/user/Job/useProfileForm";
import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";
import { useCallback, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";

const ApplyNowForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    portfolioUrl: "",
    pronouns: "",
    location: "",
    preferredStartDate: "",
    currentAvailability: "",
    salaryExpectationMin: "",
    salaryExpectationMax: "",
    coverLetter: "",
  });

  const availabilityOptions = [
    "Immediately",
    "2 weeks notice",
    "1 month notice",
    "More than 1 month",
  ];

  const [selectedFile, setSelectedFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const fileInputRef = useRef(null);
  const additionalFilesRef = useRef(null);
  const { errors, setErrors, validateForm, clearFieldError } = useProfileForm();
  const [error, setError] = useState("");
  const { user } = useAuthStore();
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

  const handleAdditionalFilesChange = (event) => {
    const files = Array.from(event.target.files);
    setAdditionalFiles((prev) => [...prev, ...files]);
  };

  const removeAdditionalFile = (index) => {
    setAdditionalFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!validateForm(formData)) {
      return;
    }

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

    // Required fields
    submitData.append("fullName", formData.fullName);
    submitData.append("email", formData.email);
    submitData.append("appliedCV", selectedFile);

    // Optional fields - only append if they have values
    if (formData.phone) submitData.append("phone", formData.phone);
    if (formData.linkedinUrl) submitData.append("linkedinUrl", formData.linkedinUrl);
    if (formData.portfolioUrl) submitData.append("portfolioUrl", formData.portfolioUrl);
    if (formData.pronouns) submitData.append("pronouns", formData.pronouns);
    if (formData.location) submitData.append("location", formData.location);
    if (formData.preferredStartDate)
      submitData.append("preferredStartDate", formData.preferredStartDate);
    if (formData.currentAvailability)
      submitData.append("currentAvailability", formData.currentAvailability);
    if (formData.salaryExpectationMin)
      submitData.append("salaryExpectationMin", formData.salaryExpectationMin);
    if (formData.salaryExpectationMax)
      submitData.append("salaryExpectationMax", formData.salaryExpectationMax);
    if (formData.coverLetter) submitData.append("coverLetter", formData.coverLetter);

    // Additional files
    additionalFiles.forEach((file) => {
      submitData.append("additionalFiles", file);
    });

    try {
      const response = await applyJob(submitData);
      if (response.success) {
        toast.success(response.message);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          linkedinUrl: "",
          portfolioUrl: "",
          pronouns: "",
          location: "",
          preferredStartDate: "",
          currentAvailability: "",
          salaryExpectationMin: "",
          salaryExpectationMax: "",
          coverLetter: "",
        });
        setSelectedFile(null);
        setAdditionalFiles([]);

        setTimeout(() => {
          router.push("/jobs/applied-jobs");
        }, 1500);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="mx-auto h-fit w-full rounded-lg bg-white p-2 text-[14px] font-normal shadow-sm sm:p-[20px] xl:max-w-[747px]">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-4 text-left text-[16px] font-medium text-black">Required Information</h2>

        <div className="grid grid-cols-1 gap-y-2.5">
          <InputField
            label="Full Name *"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
          />

          <InputField
            label="Email *"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <div className="mb-4">
            <label className="text-grayBlueText mb-1 block text-[14px]">Resume/CV Upload *</label>
            <div className="relative flex h-22 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[0.78px] border-[#CAB7CC]/[75%] p-4">
              <label
                htmlFor="cv"
                className="flex cursor-pointer flex-row items-center justify-center gap-2 text-[14px] font-medium text-[#0F8200]"
              >
                <div onClick={handleFileButtonClick}>
                  <FiUpload className="text-2xl" />
                </div>
                Upload Resume/CV
              </label>

              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx,.tex,.webp"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                required
              />

              <p className="mt-2 text-[12px] text-gray-600">
                {selectedFile ? ` ${selectedFile.name}` : "Allowed: PDF, DOC, DOCX, TEX, WEBP"}
              </p>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-grayBlueText mb-1 block text-[14px]">Cover Letter</label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-[0.78px] border-[#CAB7CC]/[75%] p-2 outline-none"
              rows="4"
              placeholder="Tell us why you're interested in this position..."
            />
          </div>

          <h2 className="mt-2 mb-2 text-left text-[16px] font-medium text-black">
            Additional Information (Optional)
          </h2>

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handlePhoneChange}
            error={errors.phone}
          />

          <InputField
            label="LinkedIn URL"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
          />

          <InputField
            label="Portfolio URL"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
          />

          <InputField
            label="Pronouns"
            name="pronouns"
            value={formData.pronouns}
            onChange={handleChange}
            placeholder="e.g., they/them, she/her, he/him"
          />

          <div className="space-y-1">
            <LocationInput
              value={formData.location}
              onChange={handleLocationChange}
              onLocationDetect={handleLocationDetect}
              error={errors.location}
            />
          </div>

          <CustomDatePicker
            value={formData.preferredStartDate}
            onChange={(date) =>
              handleChange({ target: { name: "preferredStartDate", value: date } })
            }
            label="Preferred Start Date"
          />

          <div className="mb-4">
            <label className="text-grayBlueText mb-1 block text-[14px]">Current Availability</label>
            <select
              name="currentAvailability"
              value={formData.currentAvailability}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border-[0.78px] border-[#CAB7CC]/[75%] p-2 outline-none"
            >
              <option value="">Select availability</option>
              {availabilityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-grayBlueText mb-1 block text-[14px]">
                Salary Expectation (Min)
              </label>
              <input
                type="number"
                name="salaryExpectationMin"
                value={formData.salaryExpectationMin}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border-[0.78px] border-[#CAB7CC]/[75%] p-2 outline-none"
                placeholder="Min salary"
              />
            </div>
            <div>
              <label className="text-grayBlueText mb-1 block text-[14px]">
                Salary Expectation (Max)
              </label>
              <input
                type="number"
                name="salaryExpectationMax"
                value={formData.salaryExpectationMax}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border-[0.78px] border-[#CAB7CC]/[75%] p-2 outline-none"
                placeholder="Max salary"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="text-grayBlueText mb-1 block text-[14px]">
              Additional Certificates/Documents
            </label>
            <div className="relative flex h-22 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[0.78px] border-[#CAB7CC]/[75%] p-4">
              <input
                type="file"
                multiple
                ref={additionalFilesRef}
                onChange={handleAdditionalFilesChange}
                className="absolute inset-0 cursor-pointer opacity-0"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FiUpload className="text-2xl text-[#0F8200]" />
              <p className="mt-2 text-[12px] text-gray-600">
                Upload additional certificates or documents
              </p>
            </div>
            {additionalFiles.length > 0 && (
              <div className="mt-2">
                {additionalFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeAdditionalFile(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 mb-4 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
          By submitting this application, your information will be shared with the employer. Please
          make sure your profile respects Jasmina's community guidelines.
        </div>

        <button
          type="submit"
          className="hover:text-primary bg-primary hover:border-primary hover:bg-secondary/50 mt-3 w-full rounded-md border border-transparent p-1 text-[18px] font-medium text-white transition-all duration-100 ease-in sm:mt-5 sm:p-2 sm:text-[14px]"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyNowForm;
