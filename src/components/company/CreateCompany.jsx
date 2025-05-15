"use client";
import useCompanyProfileForm from "@/hooks/validation/company/useCompanyProfileForm";
import React, { useState } from "react";
import CompanyBasicInfo from "./companyUpdateForm/CompanyBasicInfo";
import CompanyLocationForm from "./companyUpdateForm/CompanyLocationForm";
import CompanyMediaForm from "./companyUpdateForm/CompanyMediaForm";
import CompanySizeForm from "./companyUpdateForm/CompanySizeForm";
import Uploadimg from "@/assets/form/Uploadimg.png";
import Bannerimg from "@/assets/form/Bannerimg.png";
import useUpdateCompanyProfile from "@/hooks/company/useUpdateCompanyProfile";
import { useRouter } from "@/i18n/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import TermsCheckbox from "../auth/TermsCheckbox";
import { toast } from "react-toastify";
import { Loader } from "rsuite";

const CreateCompany = () => {
  const t = useTranslations("CompanyProfile.industry");
  const { mutate: updateProfile, isPending, error } = useUpdateCompanyProfile();
  const router = useRouter();

  const [selectedBannerimgImage, setSelectedBannerimgImage] =
    useState(Bannerimg);
  const [selectedCompanyImageFile, setSelectedCompanyImageFile] =
    useState(null);
  const [selectedBannerImageFile, setSelectedBannerImageFile] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    contact: "",
    website: "",
    country: "",
    city: "",
    fullAddress: "",
    industryType: "",
    companyType: "",
    employees: "",
    tagline: "",
    description: "",
    socialLinks: "",
  });

  const { errors, setErrors, validateForm, clearFieldError } =
    useCompanyProfileForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() !== "") {
      clearFieldError(name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isChecked) {
      toast.warning(t("checkSingUp"));
      return;
    }

    console.log(selectedCompanyImageFile, "selectedCompanyImageFile");
    console.log(selectedBannerImageFile, "selectedBannerImageFile");
    if (!validateForm(formData)) return;

    const submitData = new FormData();

    submitData.append("companyName", formData.companyName);
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("phoneNumber", formData.phoneNumber);
    submitData.append("country", formData.country);
    submitData.append("city", formData.city);
    submitData.append("fullAddress", formData.fullAddress);
    submitData.append("industryType", formData.industryType);
    submitData.append("companyType", formData.companyType);
    submitData.append("numberOfEmployees", formData.employees);
    submitData.append("tagline", formData.tagline);

    if (formData.contact.trim() !== "") {
      submitData.append("contact", formData.contact);
    }
    if (formData.website.trim() !== "") {
      submitData.append("website", formData.website);
    }
    if (formData.description.trim() !== "") {
      submitData.append("description", formData.description);
    }
    if (formData.socialLinks.trim() !== "") {
      submitData.append("socialLinks", formData.socialLinks);
    }

    if (selectedCompanyImageFile instanceof File) {
      submitData.append("logoUrl", selectedCompanyImageFile);
    }

    if (selectedBannerImageFile instanceof File) {
      submitData.append("coverBannerUrl", selectedBannerImageFile);
    }
    submitData.append("profileComplete", true);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          Cookies.set("profileCreated", true);
          router.push("/feed");
        }
      },
    });
  };

  return (
    <form className="space-y-2 mt-5" onSubmit={handleSubmit}>
      <CompanyBasicInfo
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        setSelectedCompanyImageFile={setSelectedCompanyImageFile}
      />

      <CompanyLocationForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <CompanySizeForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
      />

      <CompanyMediaForm
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        selectedImage={selectedBannerimgImage}
        setSelectedImage={setSelectedBannerimgImage}
        setSelectedBannerImageFile={setSelectedBannerImageFile}
      />
      <TermsCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />
      {/* <div className="flex items-center space-x-2">
        <div className="flex items-center gap-2">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />

          <label
            htmlFor="default-checkbox"
            className="text-[#888DA8] text-[13px] text-sm"
          >
            {t("signup")}
            <span className="text-[#007BFF] underline mx-1">{t("terms")}</span>
            {t("and")}
            <span className="text-[#007BFF] underline mx-1">
              {t("privacy")}
            </span>
            .
          </label>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-2 ">
        <div className="block space-y-4">
          <button className="btn-fill">
            {" "}
            {isPending ? (
              <div>
                <Loader inverse />
              </div>
            ) : (
              `${t("Next")} >`
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateCompany;
