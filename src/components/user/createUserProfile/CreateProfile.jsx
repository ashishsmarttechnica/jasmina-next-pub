import Uploadimg from "@/assets/form/Uploadimg.png";
import CustomDatePicker from "@/common/DatePicker";
import ImageUploader from "@/common/ImageUploader";
import InputField from "@/common/InputField";
import LocationSelector from "@/common/LocationSelector";
import Selecter from "@/common/Selecter";
import ReusableForm from "@/components/form/ReusableForm";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import useProfileForm from "@/hooks/validation/user/useProfileForm";
import getImg from "@/lib/getImg";
import useAuthStore from "@/store/auth.store";
import useLocationStore from "@/store/location.store";
import { useGenderOptions, usePronounOptions } from "@/utils/selectOptions";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "rsuite";

const CreateProfile = ({ isLoading, setActiveTab }) => {
  const { user, setUser } = useAuthStore();
  const { resetLocation } = useLocationStore();
  const t = useTranslations("UserProfile.profile");
  const { mutate: updateProfile, isPending, error } = useUpdateProfile();

  const [selectedImage, setSelectedImage] = useState(Uploadimg);
  const [selectedUserImageFile, setSelectedUserImageFile] = useState(null);
  const { errors, setErrors, validateForm, clearFieldError } = useProfileForm();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    gender: "",
    pronoun: "",
    dob: "",
    phone: "",
    location: "",
    LinkedInLink: "",
    isPrivate: false,
  });

  // gender options
  const genderOptions = useGenderOptions();
  // pronoun options
  const pronounOptions = usePronounOptions();

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

  const handleCheckboxChange = useCallback((e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }, []);

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
      if (val) {
        setFormData((prev) => ({ ...prev, location: val }));
        clearFieldError("location");
      }
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
    submitData.append("profile.pronoun", formData.pronoun);
    submitData.append("profile.dob", formData.dob);
    submitData.append("profile.phone", formData.phone);
    submitData.append("profile.location", formData.location);
    submitData.append("profile.isPrivate", formData.isPrivate);

    if (formData.LinkedInLink.trim() !== "") {
      submitData.append("profile.linkedin", formData.LinkedInLink);
    }
    if (selectedUserImageFile instanceof File && selectedImage !== Uploadimg) {
      submitData.append("profile.photo", selectedUserImageFile);
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
        pronoun: user.profile.pronoun || "",
        dob: user.profile.dob || "",
        phone: user.profile.phone || "",
        location: user.profile.location || "",
        LinkedInLink: user.profile.linkedin || "",
        isPrivate: user.profile.isPrivate || false,
      }));

      setSelectedImage(getImg(user.profile.photo) || Uploadimg);
    }

    // Reset location selections when component unmounts
    return () => {
      resetLocation();
    };
  }, [user, resetLocation]);

  return (
    <>
      <ReusableForm title={t("title")} maxWidth="max-w-[698px]" subtitle={t("subTitle")}>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <ImageUploader
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setSelectedImageFile={setSelectedUserImageFile}
          />

          <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
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
              options={genderOptions}
              error={errors.gender}
              isOther={true}
            />

            {/* Pronoun */}
            <Selecter
              name="pronoun"
              label={`${t("pronoun")}`}
              placeholder={t("pronounPlaceholder")}
              value={formData.pronoun}
              onChange={handleChange}
              options={pronounOptions}
              error={errors.pronoun}
              isOther={true}
            />
            <div className="col-span-2 flex items-center gap-2 text-sm text-gray-500">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleCheckboxChange}
                  className="text-primary focus:ring-primary border-primary accent-primary h-4 w-4 cursor-pointer rounded"
                />
              </div>
              <label
                className="hover:text-primary cursor-pointer font-medium transition-colors select-none"
                htmlFor="isPrivate"
              >
                {t("isPrivate")}
              </label>
            </div>

            {/* DOB */}
            <CustomDatePicker
              value={formData.dob}
              onChange={handleDateChange}
              error={errors.dob}
              label={`${t("dob")} *`}
              maxDate={new Date()}
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

            {/* LinkedIn */}
            <InputField
              label={`${t("LinkedInLink")} `}
              name="LinkedInLink"
              value={formData.LinkedInLink}
              onChange={handleLinkedInChange}
              placeholder={t("LinkedInLinkPlaceholder")}
              error={errors.LinkedInLink}
            />
          </div>

          {/* Location Selector Component */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {`${t("location")} *`}
            </label>
            <LocationSelector
              value={formData.location}
              onChange={handleLocationChange}
              error={errors.location}
            />
          </div>

          <div className="mt-6 block space-y-4">
            <button
              type="submit"
              disabled={isPending}
              className="btn-fill hover:bg-opacity-90 w-full py-3 text-base font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <div>
                  <Loader inverse />
                </div>
              ) : (
                `${t("Next")} >`
              )}
            </button>
          </div>

          {error && (
            <p className="text-center text-sm text-red-500">
              {error?.response?.data?.message || `${t("SomethingWentWrong")}`}
            </p>
          )}
        </form>
      </ReusableForm>
    </>
  );
};

export default CreateProfile;
