import Selecter from "@/common/Selecter";
import { useTranslations } from "next-intl";
import React from "react";

const CompanySizeForm = ({ formData, errors, handleChange }) => {
  const t= useTranslations('CompanyProfile.industry');
  const companyTypeOptions = [
    { label: `${t("companyTypeOption.startup")}`, value: "startup" },
    { label: `${t("companyTypeOption.smallBusiness")}`, value: "small business" },
    { label: `${t("companyTypeOption.mediumBusiness")}`, value: "medium business" },
    { label: `${t("companyTypeOption.largeBusiness")}`, value: "large business" },
    { label: `${t("companyTypeOption.enterprise")}`, value: "enterprise" },
  ];
  const industryTypeOptions = [
    { label: `${t("industryOption.beginner")}`, value: "beginner" },
    { label: `${t("industryOption.intermediate")}`, value: "intermediate" },
    { label: `${t("industryOption.advanced")}`, value: "advanced" },
    { label: `${t("industryOption.expert")}`, value: "expert" },
  ];
  const employeesOption = [
    { label: `${t("employeesOption.1-10")}`, value: "1-10" },
    { label: `${t("employeesOption.11-50")}`, value: "11-50" },
    { label: `${t("employeesOption.51-100")}`, value: "51-100" },
    { label: `${t("employeesOption.101-500")}`, value: "101-500" },
    { label: `${t("employeesOption.501-1000")}`, value: "501-1000" },
    { label: `${t("employeesOption.1001-5000")}`, value: "1001-5000" },
    { label: `${t("employeesOption.5001-10000")}`, value: "5001-10,000" },
    { label: `${t("employeesOption.10000")}`, value: "10,000+" },
  ];
  return (
    <>
      <div className="text-center my-4">
        <p className="font-medium text-[15px] mt-7">{t("title")}</p>
        <p className="text-grayBlueText text-[13px]">
          {t("subTitle")}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <Selecter
          name="industryType"
          label={`${t("industryType")}*`}
          placeholder={t("industryPlaceholder")}
          value={formData.industryType}
          onChange={handleChange}
          options={industryTypeOptions}
          error={errors.industryType}
        />
        <Selecter
          name="companyType"
          label={`${t("companyType")}*`}
          placeholder={t("companyTypePlaceholder")}
          value={formData.companyType}
          onChange={handleChange}
          options={companyTypeOptions}
          error={errors.companyType}
        />
        <Selecter
          name="employees"
          label={`${t("employees")}*`}
          placeholder={t("employeesPlaceholder")}
          value={formData.employees}
          onChange={handleChange}
          options={employeesOption}
          error={errors.employees}
        />
      </div>
    </>
  );
};

export default CompanySizeForm;
