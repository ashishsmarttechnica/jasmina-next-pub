"use client";
import InputField from "@/common/InputField";
import LocationSelector from "@/common/LocationSelector";
import { useCountries } from "@/hooks/location/useLocationData";
import { useTranslations } from "next-intl";
import { useCallback } from "react";

const CompanyLocationForm = ({ formData, errors, setFormData, handleChange, clearFieldError }) => {
  const t = useTranslations("CompanyProfile.location");
  const { data: countries } = useCountries();

  // const countries = [
  //   { label: `${t("countryoption.japan")}`, value: "japan" },
  //   { label: `${t("countryoption.mexico")}`, value: "mexico" },
  //   { label: `${t("countryoption.netherlands")}`, value: "netherlands" },
  //   { label: `${t("countryoption.sweden")}`, value: "sweden" },
  //   { label: `${t("countryoption.norway")}`, value: "norway" },
  // ];

  const handleLocationChange = useCallback(
    (locationString, countryData) => {
      if (locationString) {
        setFormData((prev) => ({
          ...prev,
          country: locationString,
          // If countryData is provided, use its isLGBTQ property
          ...(countryData && { isLGBTQ: countryData.isLGBTQ }),
        }));

        clearFieldError("location");
      }
    },
    [clearFieldError, setFormData]
  );

  return (
    <>
      <div className="mb-4 text-center">
        <p className="mt-7 text-[15px] font-medium">{t("title")}</p>
        <p className="text-grayBlueText text-[13px]">{t("subTitle")}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* <Selecter
          name="country"
          label={`${t("country")}*`}
          placeholder={t("placeholderCountry")}
          value={formData.country}
          onChange={handleChange}
          options={countries}
          error={errors.country}
        /> */}
        {/*
        <InputField
          label={`${t("city")} *`}
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        /> */}

        {/* Location Selector Component */}
      </div>
      <div className="space-y-1">
        <LocationSelector
          value={formData.country}
          onChange={handleLocationChange}
          error={errors.country}
          isLGBTQ={true}
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
