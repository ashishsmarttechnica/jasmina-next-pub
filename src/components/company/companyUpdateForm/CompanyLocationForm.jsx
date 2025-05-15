import InputField from "@/common/InputField";
import Selecter from "@/common/Selecter";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const CompanyLocationForm = ({ formData, errors, handleChange }) => {
  const t = useTranslations("CompanyProfile.location");
  const countries = [
    { label: `${t("countryoption.japan")}`, value: "japan" },
    { label: `${t("countryoption.mexico")}`, value: "mexico" },
    { label: `${t("countryoption.netherlands")}`, value: "netherlands" },
    { label: `${t("countryoption.sweden")}`, value: "sweden" },
    { label: `${t("countryoption.norway")}`, value: "norway" },
  ];
  return (
    <>
      <div className="text-center mb-4">
        <p className="font-medium text-[15px] mt-7">{t("title")}</p>
        <p className="text-[#888DA8] text-[13px]">{t("subTitle")}</p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <Selecter
          name="country"
          label={`${t("country")}*`}
          placeholder={t("placeholderCountry")}
          value={formData.country}
          onChange={handleChange}
          options={countries}
          error={errors.country}
        />

        <InputField
          label={`${t("city")} *`}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />
      </div>

      <InputField
        label={`${t("fullAddress")} *`}
        type="text"
        name="fullAddress"
        value={formData.fullAddress}
        onChange={handleChange}
        error={errors.fullAddress}
      />
    </>
  );
};

export default CompanyLocationForm;
