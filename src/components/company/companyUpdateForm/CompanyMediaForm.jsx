import ImageUploader from "@/common/ImageUploader";
import InputField from "@/common/InputField";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import getImg from "../../../lib/getImg";

const CompanyMediaForm = ({
  formData,
  errors,
  handleChange,
  selectedImage,
  setSelectedImage,
  setSelectedBannerImageFile,
}) => {
  const t = useTranslations("CompanyProfile.media");
  console.log(getImg(formData.coverBannerUrl));

  useEffect(() => {
    if (formData.coverBannerUrl) {
      setSelectedImage(getImg(formData.coverBannerUrl));
    }
  }, [formData.logoUrl]);
  return (
    <>
      <div className="mb-4 text-center">
        <p className="mt-7 text-[15px] font-medium">{t("title")}</p>
        <p className="text-grayBlueText text-[13px]">{t("subTitle")}</p>
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
      <div>
        <p className="mb-1 text-sm text-gray-500">{t("uploadImage")}</p>
        <ImageUploader
          isBanner={true}
          isnotCEntered={true}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setSelectedImageFile={setSelectedBannerImageFile}
        />
      </div>
    </>
  );
};

export default CompanyMediaForm;
