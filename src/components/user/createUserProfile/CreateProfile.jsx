import React, { useState, useCallback, useEffect } from "react";
import ReusableForm from "../../form/ReusableForm";
import useProfileForm from "@/hooks/validation/user/useProfileForm";
import Uploadimg from "@/assets/Form/Uploadimg.png";
import ImageUploader from "@/common/ImageUploader";
import LocationInput from "@/common/LocationInput";
import CustomDatePicker from "@/common/DatePicker";
import useAuthStore from "@/store/auth.store";
import useUser from "@/hooks/auth/useUser";
import Selecter from "@/common/Selecter";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import { useTranslations } from "next-intl";
import InputField from "@/common/InputField"; // Import the InputField component
import { Loader } from "rsuite";

const CreateProfile = ({ isLoading, setActiveTab }) => {
  const { user, setUser } = useAuthStore();
  const t = useTranslations("UserProfile.profile");
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();

  const [selectedImage, setSelectedImage] = useState(Uploadimg);
  const { errors, setErrors, validateForm, clearFieldError } = useProfileForm();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    gender: "",
    dob: "",
    phone: "",
    location: "",
    LinkedInLink: "",
  });

  // gender options
  const options = [
    { label: `${t("genderOption.male")}`, value: "male" },
    { label: `${t("genderOption.female")}`, value: "female" },
    { label: `${t("genderOption.other")}`, value: "other" },
  ];

  // Update form data when user data is loaded

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

  const handleLinkedInChange = useCallback(
    (e) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, LinkedInLink: value }));
      if (value.trim() !== "") {
        clearFieldError("LinkedInLink");
      }
    },
    [clearFieldError]
  );

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;

    const submitData = new FormData();
    submitData.append("profile.fullName", formData.name);
    submitData.append("profile.userName", formData.username);
    submitData.append("profile.gender", formData.gender);
    submitData.append("profile.dob", formData.dob);
    submitData.append("profile.phone", formData.phone);
    submitData.append("profile.location", formData.location);

    if (formData.LinkedInLink.trim() !== "") {
      submitData.append("profile.linkedin", formData.LinkedInLink);
    }
    if (selectedImage !== Uploadimg) {
      submitData.append("profile.photo", selectedImage);
    }
    submitData.append("steps", 1);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          setActiveTab(1);
        }
      },
    });
  };

  // Update form data when user data is loaded
  useEffect(() => {
    if (user?.profile) {
      setFormData((prev) => ({
        ...prev,
        name: user.profile.fullName || "",
        username: user.profile.userName || "",
        gender: user.profile.gender || "",
        dob: user.profile.dob || "",
        phone: user.profile.phone || "",
        location: user.profile.location || "",
        LinkedInLink: user.profile.linkedin || "",
      }));
      setSelectedImage(user.profile.photo || Uploadimg);
    }
  }, [user]);

  return (
    <>
      <ReusableForm
        title={t("title")}
        maxWidth="max-w-[698px]"
        subtitle={t("subTitle")}
      >
        <form className="space-y-4 mt-5" onSubmit={handleSubmit}>
          <ImageUploader
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <div className="grid sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
            {/* Full Name */}
            <InputField
              label={`${t("name")} *`}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t("namePlaceholder")}
              error={errors.name}
            />

            {/* User Name */}
            <InputField
              label={`${t("username")} *`}
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t("usernamePlaceholder")}
              error={errors.username}
            />

            {/* Gender */}
            <Selecter
              name="gender"
              label={`${t("gender")} *`}
              placeholder={t("genderPlaceholder")}
              value={formData.gender}
              onChange={handleChange}
              options={options}
              error={errors.gender}
            />

            {/* DOB */}
            <CustomDatePicker
              value={formData.dob}
              onChange={handleDateChange}
              error={errors.dob}
              label={`${t("dob")} *`}
            />

            {/* Phone */}
            <InputField
              label={`${t("phone")} *`}
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder={t("phonePlaceholder")}
              error={errors.phone}
              type="tel"
            />

            {/* Location */}
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
          </div>

          {/* LinkedIn */}
          <InputField
            label={`${t("LinkedInLink")} *`}
            name="LinkedInLink"
            value={formData.LinkedInLink}
            onChange={handleLinkedInChange}
            placeholder={t("LinkedInLinkPlaceholder")}
            error={errors.LinkedInLink}
          />

          <div className="block space-y-4 mt-6">
            <button
              type="submit"
              disabled={isPending}
              className="btn-fill w-full py-3 text-base font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ?  <div><Loader inverse  /></div> : `${t("Next")} >`}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error?.response?.data?.message || `${t("SomethingWentWrong")}`}
            </p>
          )}
        </form>
      </ReusableForm>
    </>
  );
};

export default CreateProfile;
