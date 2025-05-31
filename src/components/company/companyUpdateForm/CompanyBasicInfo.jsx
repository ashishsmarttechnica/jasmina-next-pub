import Uploadimg from "@/assets/form/Uploadimg.png";
import ImageUploader from "@/common/ImageUploader";
import InputField from "@/common/InputField";
import getImg from "@/lib/getImg";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CompanyBasicInfo = ({ formData, errors, handleChange, setSelectedCompanyImageFile }) => {
  const [selectedImage, setSelectedImage] = useState(Uploadimg);
  const t = useTranslations("CompanyProfile.profile");

  useEffect(() => {
    if (formData.logoUrl) {
      setSelectedImage(getImg(formData.logoUrl));
    }
  }, [formData.logoUrl]);
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <div>
        <p className="mb-1 text-center text-sm text-gray-500">{t("uploadLogoImage")}</p>
        <ImageUploader
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setSelectedImageFile={setSelectedCompanyImageFile}
        />
      </div>
    </>
  );
};

export default CompanyBasicInfo;
