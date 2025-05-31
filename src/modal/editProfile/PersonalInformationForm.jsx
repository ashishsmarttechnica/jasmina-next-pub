"use client";

import { useTranslations } from "next-intl";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CustomDatePicker from "../../common/DatePicker";
import LocationSelector from "../../common/LocationSelector";
import Selecter from "../../common/Selecter";
import InputField from "../../components/form/InputField";

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
    });

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
        });
      }
    }, [initialData, email]);

    useImperativeHandle(ref, () => ({
      getData: () => localData,
    }));

    const genderOptions = [
      { label: `${t("genderOption.male")}`, value: "male" },
      { label: `${t("genderOption.female")}`, value: "female" },
      { label: `${t("genderOption.other")}`, value: "other" },
    ];

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
          <CustomDatePicker
            name="dob"
            label={`${t("dob")} *`}
            value={localData.dob}
            onChange={handleDateChange}
            error={errors.dob}
            placeholder={t("dobPlaceholder")}
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
