"use client";

import CustomDatePicker from "@/common/DatePicker";
import InputField from "@/common/InputField";
import LocationSelector from "@/common/LocationSelector";
import Selecter from "@/common/Selecter";
import { useGenderOptions, usePronounOptions } from "@/utils/selectOptions";
import { useTranslations } from "next-intl";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react";

const PersonalInformationForm = forwardRef(
  ({ initialData, errors = {}, clearFieldError, email }, ref) => {
    const t = useTranslations("UserProfile.profile");
    const [localData, setLocalData] = useState({
      fullName: "",
      userName: "",
      gender: "",
      dob: "",
      phone: "",
      location: "",
      linkedin: "",
      email: "",
      isPrivate: false,
      pronoun: "",
    });
    
    const genderOptions = useGenderOptions();
    const pronounOptions = usePronounOptions();
    useEffect(() => {
      if (initialData || email) {
        setLocalData({
          fullName: initialData?.fullName || "",
          userName: initialData?.userName || "",
          gender: initialData?.gender || "",
          dob: initialData?.dob || "",
          phone: initialData?.phone || "",
          location: initialData?.location || "",
          linkedin: initialData?.linkedin || "",
          email: initialData?.email || email || "",
          pronoun: initialData?.pronounce || "",
          isPrivate: initialData?.isPrivate || false,
        });
      }
    }, [initialData, email]);

    useImperativeHandle(ref, () => ({
      getData: () => localData,
    }));

    const handleChange = (e) => {
      const { name, value } = e.target;
      setLocalData((prev) => ({ ...prev, [name]: value }));
      if (clearFieldError) clearFieldError(name);
    };

    const handleDateChange = (val) => {
      setLocalData((prev) => ({ ...prev, dob: val }));
      if (clearFieldError) clearFieldError("dob");
    };

    const handleGenderChange = (e) => {
      const { name, value } = e.target;
      setLocalData((prev) => ({ ...prev, gender: value }));
      if (clearFieldError) clearFieldError("gender");
    };

    const handleLocationChange = (val) => {
      setLocalData((prev) => ({ ...prev, location: val }));
      if (clearFieldError) clearFieldError("location");
    };
    const handleCheckboxChange = useCallback((e) => {
      const { name, checked } = e.target;
      setLocalData((prev) => ({ ...prev, [name]: checked }));
    }, []);

    return (
      <div className="space-y-4">
        <p className="mb-2 py-1 text-lg font-semibold text-gray-800">{t("personalInfo")}</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            name="fullName"
            label={`${t("name")} *`}
            value={localData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            placeholder={t("namePlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
          <InputField
            name="userName"
            label={`${t("username")} *`}
            value={localData.userName}
            onChange={handleChange}
            error={errors.userName}
            placeholder={t("usernamePlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />

          <Selecter
            label={`${t("gender")} *`}
            value={localData.gender}
            onChange={handleGenderChange}
            name="gender"
            error={errors.gender}
            options={genderOptions}
            placeholder={t("genderPlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
            isOther={true}
          />
          <Selecter
            name="pronoun"
            label={`${t("pronoun")}`}
            placeholder={t("pronounPlaceholder")}
            value={localData.pronoun}
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
                checked={localData.isPrivate}
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
          <CustomDatePicker
            name="dob"
            label={`${t("dob")} *`}
            value={localData.dob}
            onChange={handleDateChange}
            error={errors.dob}
            placeholder={t("dobPlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
          <InputField
            name="phone"
            label={`${t("phone")} *`}
            value={localData.phone}
            onChange={handleChange}
            error={errors.phone}
            placeholder={t("phonePlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
          <InputField
            name="linkedin"
            label={`${t("LinkedInLink")} *`}
            value={localData.linkedin}
            onChange={handleChange}
            error={errors.linkedin}
            placeholder={t("LinkedInLinkPlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
          <InputField
            name="email"
            label={`${t("email")}`}
            value={localData.email}
            onChange={handleChange}
            error={errors.email}
            placeholder={t("emailPlaceholder")}
            className="focus:border-primary-500 focus:ring-primary-500 rounded-lg border-gray-300"
          />
        </div>
        <LocationSelector
          value={localData.location}
          onChange={handleLocationChange}
          error={errors.location}
          className="focus:border-primary-500 focus:ring-primary-500 w-full rounded-lg border-gray-300"
        />
      </div>
    );
  }
);

PersonalInformationForm.displayName = "PersonalInformationForm";

export default PersonalInformationForm;
