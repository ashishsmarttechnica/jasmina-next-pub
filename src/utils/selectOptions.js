"use client";

import { useTranslations } from "next-intl";

export const useGenderOptions = () => {
  const t = useTranslations("UserProfile.profile");
  return [
    { label: `${t("genderOption.woman")}`, value: "Woman" },
    { label: `${t("genderOption.male")}`, value: "Male" },
    { label: `${t("genderOption.nonbinary")}`, value: "Non-binary" },
    { label: `${t("genderOption.transwoman")}`, value: "Trans woman" },
    { label: `${t("genderOption.transman")}`, value: "Trans Man" },
    { label: `${t("genderOption.intersex")}`, value: "Intersex" },
    { label: `${t("genderOption.Agender")}`, value: "Agender" },
    { label: `${t("genderOption.genderqueergenderfluid")}`, value: "Genderqueer / Genderfluid" },
    { label: `${t("genderOption.twospirit")}`, value: "Two-Spirit (for Indigenous communities)" },
    { label: `${t("genderOption.diverse")}`, value: "Diverse" },
    { label: `${t("genderOption.prefersay")}`, value: "Prefers to say" },
  ];
};

export const usePronounOptions = () => {
  const t = useTranslations("UserProfile.profile");
  return [
    { label: `${t("pronounOption.sheher")}`, value: "She/her" },
    { label: `${t("pronounOption.hehim")}`, value: "He/him" },
    { label: `${t("pronounOption.theythem")}`, value: "They/them" },
    { label: `${t("pronounOption.shethey")}`, value: "She/they" },
    { label: `${t("pronounOption.hethey")}`, value: "He/they" },
    { label: `${t("pronounOption.xe")}`, value: "Xe/Xem" },
    { label: `${t("genderOption.prefersay")}`, value: "Prefers to say" },
  ];
};

export const useProficiencyOptions = () => {
  const t = useTranslations("UserProfile.education");
  return [
    { label: `${t("proficiencyOptions.beginner")}`, value: "Beginner" },
    { label: `${t("proficiencyOptions.intermediate")}`, value: "Intermediate" },
    { label: `${t("proficiencyOptions.advanced")}`, value: "Advanced" },
    { label: `${t("proficiencyOptions.expert")}`, value: "Expert" },
  ];
};

export const useRoleOptions = () => {
  const t = useTranslations("UserProfile.preferences");

  return [
    {
      label: `${t("jobroleoption.AdministrationHRConsultingCEO")}`,
      value: "Administration / HR / Consulting / CEO",
    },
    { label: `${t("jobroleoption.BankingInsurance")}`, value: "Banking / Insurance" },
    {
      label: `${t("jobroleoption.ConstructionArchitectureEngineering")}`,
      value: "Construction / Architecture / Engineering",
    },
    {
      label: `${t("jobroleoption.SecurityPoliceCustomsEmergencyServices")}`,
      value: "Security / Police / Customs / Emergency Services",
    },
    {
      label: `${t("jobroleoption.ChemistryPharmaceuticalsBiotechnology")}`,
      value: "Chemistry / Pharmaceuticals / Biotechnology",
    },
    {
      label: `${t("jobroleoption.PurchasingLogisticsTrading")}`,
      value: "Purchasing / Logistics / Trading",
    },
    {
      label: `${t("jobroleoption.ElectronicsTechnologyWatches")}`,
      value: "Electronics / Technology / Watches",
    },
    {
      label: `${t("jobroleoption.VehiclesSkilledTradesWarehousingTransportation")}`,
      value: "Vehicles / Skilled Trades / Warehousing / Transportation",
    },
    {
      label: `${t("jobroleoption.FinanceFiduciaryServicesRealEstate")}`,
      value: "Finance / Fiduciary Services / Real Estate",
    },
    {
      label: `${t("jobroleoption.HospitalityFoodTourism")}`,
      value: "Hospitality / Food / Tourism",
    },
    {
      label: `${t("jobroleoption.GraphicDesignTypographyPrinting")}`,
      value: "Graphic Design / Typography / Printing",
    },
    {
      label: `${t("jobroleoption.ITTelecommunications")}`,
      value: "IT / Telecommunications",
    },
    { label: `${t("jobroleoption.LawLegal")}`, value: "Law / Legal" },
    {
      label: `${t("jobroleoption.MarketingCommunicationsEditorial")}`,
      value: "Marketing / Communications / Editorial",
    },
    {
      label: `${t("jobroleoption.MechanicalPlantEngineeringManufacturing")}`,
      value: "Mechanical / Plant Engineering / Manufacturing",
    },
    {
      label: `${t("jobroleoption.MedicineCareTherapy")}`,
      value: "Medicine / Care / Therapy",
    },
    { label: `${t("jobroleoption.sportsWellnessCulture")}`, value: "Sports / Wellness / Culture" },

    {
      label: `${t("jobroleoption.SalesCustomerServiceInternalSales")}`,
      value: "Sales / Customer Service / Internal Sales",
    },
    {
      label: `${t("jobroleoption.PublicAdministrationEducationSocialServices")}`,
      value: "Public Administration / Education / Social Services",
    },
  ];
};

export const useJobTypeOptions = () => {
  const t = useTranslations("UserProfile.preferences");
  return [
    `${t("jobtypeoption.full-time")}`,
    `${t("jobtypeoption.part-time")}`,
    `${t("jobtypeoption.internship")}`,
    `${t("jobtypeoption.freelancer")}`,
    `${t("jobtypeoption.remote")}`,
  ];
};

export const useWorkLocationOptions = () => {
  const t = useTranslations("UserProfile.preferences");
  return [
    { label: `${t("worklocationoption.remote")}`, value: "remote" },
    { label: `${t("worklocationoption.onsite")}`, value: "on-site" },
    { label: `${t("worklocationoption.both")}`, value: "both" },
  ];
};

export const useIndustryOptions = () => {
  const t = useTranslations("UserProfile.preferences");
  return [
    { label: `${t("industryoption.design")}`, value: "design" },
    { label: `${t("industryoption.development")}`, value: "development" },
  ];
};

export const useSkillCategoryOptions = () => {
  const t = useTranslations("UserProfile.education");
  return [
    { label: `${t("skillCategoryOptions.Technology")}`, value: "Technology" },
    { label: `${t("skillCategoryOptions.Finance")}`, value: "Finance" },
    { label: `${t("skillCategoryOptions.Healthcare")}`, value: "Healthcare" },
    { label: `${t("skillCategoryOptions.Education")}`, value: "Education" },
    { label: `${t("skillCategoryOptions.MediaEntertainment")}`, value: "Media & Entertainment" },
    { label: `${t("skillCategoryOptions.RetailEcommerce")}`, value: "Retail & E-commerce" },
    { label: `${t("skillCategoryOptions.HospitalityTourism")}`, value: "Hospitality & Tourism" },
    {
      label: `${t("skillCategoryOptions.GovernmentPublicSector")}`,
      value: "Government & Public Sector",
    },
    {
      label: `${t("skillCategoryOptions.NonprofitSocialImpact")}`,
      value: "Non-profit & Social Impact",
    },
    { label: `${t("skillCategoryOptions.Legal")}`, value: "Legal" },
    {
      label: `${t("skillCategoryOptions.ConstructionRealEstate")}`,
      value: "Construction & Real Estate",
    },
    {
      label: `${t("skillCategoryOptions.ManufacturingElectronics")}`,
      value: "Manufacturing Electronics",
    },
    { label: `${t("skillCategoryOptions.EnergyUtilities")}`, value: "Energy & Utilities" },
    {
      label: `${t("skillCategoryOptions.TransportationLogistics")}`,
      value: "Transportation & Logistics",
    },
    {
      label: `${t("skillCategoryOptions.ConsultingBusinessServices")}`,
      value: "Consulting & Business Services",
    },
    { label: `${t("skillCategoryOptions.ScienceResearch")}`, value: "Science & Research" },
    {
      label: `${t("skillCategoryOptions.MarketingAdvertising")}`,
      value: "Marketing & Advertising",
    },
    { label: `${t("skillCategoryOptions.AgricultureFood")}`, value: "Agriculture & Food" },
    {
      label: `${t("skillCategoryOptions.GamingInteractiveMedia")}`,
      value: "Gaming & Interactive Media",
    },
    { label: `${t("skillCategoryOptions.BeautyWellness")}`, value: "Beauty & Wellness" },
  ];
};

export const useIndustryTypeOptions = () => {
  const t = useTranslations("CompanyProfile.industry");

  return [
    { label: `${t("industryOption.technology")}`, value: "Technology" },
    { label: `${t("industryOption.finance")}`, value: "Finance" },
    { label: `${t("industryOption.healthcare")}`, value: "Healthcare" },
    { label: `${t("industryOption.education")}`, value: "Education" },
    { label: `${t("industryOption.mediaEntertainment")}`, value: "Media & Entertainment" },
    { label: `${t("industryOption.retailEcommerce")}`, value: "Retail & E-commerce" },
    { label: `${t("industryOption.hospitalityTourism")}`, value: "Hospitality & Tourism" },
    { label: `${t("industryOption.governmentPublicSector")}`, value: "Government & Public Sector" },
    { label: `${t("industryOption.nonprofitSocialImpact")}`, value: "Non-profit & Social Impact" },
    { label: `${t("industryOption.legal")}`, value: "Legal" },
    { label: `${t("industryOption.constructionRealEstate")}`, value: "Construction & Real Estate" },
    {
      label: `${t("industryOption.manufacturingElectronics")}`,
      value: "Manufacturing Electronics",
    },
    { label: `${t("industryOption.energyUtilities")}`, value: "Energy & Utilities" },
    {
      label: `${t("industryOption.transportationLogistics")}`,
      value: "Transportation & Logistics",
    },
    {
      label: `${t("industryOption.consultingBusinessServices")}`,
      value: "Consulting & Business Services",
    },
    { label: `${t("industryOption.scienceResearch")}`, value: "Science & Research" },
    { label: `${t("industryOption.marketingAdvertising")}`, value: "Marketing & Advertising" },
    { label: `${t("industryOption.agricultureFood")}`, value: "Agriculture & Food" },
    { label: `${t("industryOption.gamingInteractiveMedia")}`, value: "Gaming & Interactive Media" },
    { label: `${t("industryOption.beautyWellness")}`, value: "Beauty & Wellness" },
  ];
};

export const useCurrencyOptions = () => {
  const t = useTranslations("UserProfile");

  return [
    { value: "USD", label: `USD ($) ${t("currency.usd") || "USD"}` },
    { value: "EUR", label: `EUR (€) ${t("currency.eur") || "EUR"}` },
    { value: "GBP", label: `GBP (£) ${t("currency.gbp") || "GBP"}` },
    { value: "INR", label: `INR (₹) ${t("currency.inr") || "INR"}` },
    { value: "AED", label: `AED (د.إ) ${t("currency.aed") || "AED"}` },
    { value: "CAD", label: `CAD (C$) ${t("currency.cad") || "CAD"}` },
    { value: "AUD", label: `AUD (A$) ${t("currency.aud") || "AUD"}` },
    { value: "JPY", label: `JPY (¥) ${t("currency.jpy") || "JPY"}` },
    { value: "CHF", label: `CHF (₣) ${t("currency.chf") || "CHF"}` },
    { value: "NZD", label: `NZD (NZ$) ${t("currency.nzd") || "NZD"}` },
    { value: "RUB", label: `RUB (₽) ${t("currency.rub") || "RUB"}` },
    { value: "ZAR", label: `ZAR (R) ${t("currency.zar") || "ZAR"}` },
    { value: "MXN", label: `MXN (MX$) ${t("currency.mxn") || "MXN"}` },
    { value: "BRL", label: `BRL (R$) ${t("currency.brl") || "BRL"}` },
    { value: "ARS", label: `ARS ($) ${t("currency.ars") || "ARS"}` },
    { value: "CLP", label: `CLP ($) ${t("currency.clp") || "CLP"}` },
    { value: "COP", label: `COP ($) ${t("currency.cop") || "COP"}` },
    { value: "PEN", label: `PEN (S/) ${t("currency.pen") || "PEN"}` },
    { value: "UYU", label: `UYU ($) ${t("currency.uyu") || "UYU"}` },
    { value: "PYG", label: `PYG (₲) ${t("currency.pyg") || "PYG"}` },
    { value: "VEF", label: `VEF (Bs.S) ${t("currency.vef") || "VEF"}` },
    { value: "VND", label: `VND (₫) ${t("currency.vnd") || "VND"}` },
    { value: "ZMW", label: `ZMW (K) ${t("currency.zmw") || "ZMW"}` },
    { value: "XOF", label: `XOF (CFA) ${t("currency.xof") || "XOF"}` },
    { value: "XAF", label: `XAF (FCFA) ${t("currency.xaf") || "XAF"}` },
  ];
};

export const usePositionOptions = () => {
  const t = useTranslations("UserProfile.education");
  return [
    { label: `${t("positionOption.senior")}`, value: "Senior" },
    { label: `${t("positionOption.mid")}`, value: "Mid" },
    { label: `${t("positionOption.junior")}`, value: "Junior" },
    { label: `${t("positionOption.intern")}`, value: "Intern" },
    { label: `${t("positionOption.volunteer")}`, value: "Volunteer" },
    { label: `${t("positionOption.freelancer")}`, value: "Freelancer" },
    { label: `${t("positionOption.manager")}`, value: "Manager" },
    { label: `${t("positionOption.director")}`, value: "Director" },
  ];
};

export const useAvailabilityOptions = () => {
  const t = useTranslations("UserProfile.profile");
  return [
    { label: `${t("availabilityOption.openToWork")}`, value: "Open to Work" },
    { label: `${t("availabilityOption.lookingForWork")}`, value: "Looking for Work" },
    { label: `${t("availabilityOption.freelancer")}`, value: "Freelancer" },
    { label: `${t("availabilityOption.volunteer")}`, value: "Volunteer" },
    { label: `${t("availabilityOption.intern")}`, value: "Intern" },
    { label: `${t("availabilityOption.remote")}`, value: "Remote" },
    { label: `${t("availabilityOption.hybrid")}`, value: "Hybrid" },
    { label: `${t("availabilityOption.part-time")}`, value: "Part-time" },
    { label: `${t("availabilityOption.full-time")}`, value: "Full-time" },
    
  ];
};
