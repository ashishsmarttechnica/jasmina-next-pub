import { useTranslations } from "next-intl";
import { use, useState } from "react";

const useCompanyProfileForm = () => {
  const [errors, setErrors] = useState({});
  const t=useTranslations("CompanyProfile")

  const validateForm = (formData) => {
    const newErrors = {};
    if (!formData.companyName.trim())
      newErrors.companyName = t("profile.companyNameError");
    if (!formData.firstName.trim())
      newErrors.firstName =t("profile.firstNameError");
    if (!formData.lastName.trim())
      newErrors.lastName = t("profile.lastNameError");
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = t("profile.phoneNumberError");
    if (!formData.country.trim()) newErrors.country = t("location.countryError");
    if (!formData.city.trim()) newErrors.city = t("location.cityError");
    if (!formData.fullAddress.trim())
      newErrors.fullAddress = t("location.fullAddressError");
    if (!formData.industryType.trim())
      newErrors.industryType = t("industry.industryTypeError");
    if (!formData.companyType.trim())
      newErrors.companyType = t("industry.companyTypeError");
    // if (!formData.socialLinks.trim())
    //   newErrors.socialLinks = "socialLinks is required.";
    if (!formData.tagline.trim()) newErrors.tagline = t("industry.taglineError");
    if (!formData.employees.trim())
      newErrors.employees = t("industry.employeesError");
    // if (!formData.description.trim())
    //   newErrors.description = "Description is required.";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (fieldName) => {
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  return { errors, setErrors, validateForm, clearFieldError };
};

export default useCompanyProfileForm;
