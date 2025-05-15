import Image from "next/image";
import React from "react";
import Bannerimg from "@/assets/form/Bannerimg.png";
import ImageUploader from "@/common/ImageUploader";
import { useTranslations } from "next-intl";
import InputField from "@/common/InputField";

const CompanyMediaForm = ({
  formData,
  errors,
  handleChange,
  selectedImage,
  setSelectedImage,
  setSelectedBannerImageFile,
}) => {
  const t = useTranslations("CompanyProfile.media");
  return (
    <>
      <div className="text-center mb-4">
        <p className="font-medium text-[15px] mt-7">{t("title")}</p>
        <p className="text-[#888DA8] text-[13px]">{t("subTitle")}</p>
      </div>
      <InputField
        label={`${t("tagline")}*`}
        type="text"
        name="tagline"
        value={formData.tagline}
        onChange={handleChange}
        error={errors.tagline}
      />
      <InputField
        label={t("description")}
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        textarea
        rows={4}
      />

      <InputField
        label={t("socialLinks")}
        type="url"
        placeholder="https://example.com"
        name="socialLinks"
        value={formData.socialLinks}
        onChange={handleChange}
      />
      <ImageUploader
        isBanner={true}
        isnotCEntered={true}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setSelectedImageFile={setSelectedBannerImageFile}
      />
    </>
  );
};

export default CompanyMediaForm;
