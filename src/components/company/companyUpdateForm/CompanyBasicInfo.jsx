import React, { useState } from "react";
import Image from "next/image";
import Uploadimg from "@/assets/form/Uploadimg.png";
import ImageUploader from "@/common/ImageUploader";
import { useTranslations } from "next-intl";
import InputField from "@/common/InputField";

const CompanyBasicInfo = ({
  formData,
  errors,
  handleChange,
  setSelectedCompanyImageFile,
}) => {
  const [selectedImage, setSelectedImage] = useState(Uploadimg);
  const t = useTranslations("CompanyProfile.profile");
  return (
    <>
      <div className="space-y-2">
        <InputField
          label={`${t("companyName")} *`}
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
        />
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <InputField
          label={`${t("firstName")} *`}
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <InputField
          label={`${t("lastName")} *`}
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <InputField
          label={`${t("phoneNumber")}*`}
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          error={errors.phoneNumber}
        />
        <InputField
          label={t("contact")}
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          error={errors.contact}
        />
      </div>
      <div className="space-y-2">
        <InputField
          label={t("website")}
          type="url"
          name="website"
          placeholder={t("websiteplaceholder")}
          value={formData.website}
          onChange={handleChange}
          error={errors.website}
        />
      </div>
      <ImageUploader
        isnotCEntered={true}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setSelectedImageFile={setSelectedCompanyImageFile}
      />
    </>
  );
};

export default CompanyBasicInfo;
