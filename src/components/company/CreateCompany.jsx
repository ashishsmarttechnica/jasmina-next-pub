"use client";
import Bannerimg from "@/assets/form/Bannerimg.png";
import useUpdateCompanyProfile from "@/hooks/company/useUpdateCompanyProfile";
import useCompanyProfileForm from "@/hooks/validation/company/useCompanyProfileForm";
import { useRouter } from "@/i18n/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader } from "rsuite";
import TermsCheckbox from "../auth/TermsCheckbox";
import CompanyBasicInfo from "./companyUpdateForm/CompanyBasicInfo";
import CompanyLocationForm from "./companyUpdateForm/CompanyLocationForm";
import CompanyMediaForm from "./companyUpdateForm/CompanyMediaForm";
import CompanySizeForm from "./companyUpdateForm/CompanySizeForm";

const CreateCompany = () => {
  const t = useTranslations("CompanyProfile.industry");
  const { mutate: updateProfile, isPending, error } = useUpdateCompanyProfile();
  const router = useRouter();

  const [selectedBannerimgImage, setSelectedBannerimgImage] = useState(Bannerimg);
  const [selectedCompanyImageFile, setSelectedCompanyImageFile] = useState(null);
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
    location: "",
    fullAddress: "",
    industryType: [],
    companyType: "",
    employees: "",
    tagline: "",
    description: "",
    socialLinks: "",
    instagramLink: "",
    twitterLink: "",
    facebookLink: "",
    isLGBTQ: false,
  });

  const { errors, setErrors, validateForm, clearFieldError } = useCompanyProfileForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (Array.isArray(value)) {
      if (value.length > 0) {
        clearFieldError(name);
      }
    } else if (typeof value === "string" && value.trim() !== "") {
      clearFieldError(name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    if (!isChecked) {
      toast.warning(t("checkSingUp"));
      return;
    }

    const submitData = new FormData();

    submitData.append("companyName", formData.companyName);
    submitData.append("firstName", formData.firstName);
    submitData.append("lastName", formData.lastName);
    submitData.append("phoneNumber", formData.phoneNumber);
    submitData.append("country", formData.country);
    submitData.append("city", formData.city);
    submitData.append("fullAddress", formData.fullAddress);

    if (Array.isArray(formData.industryType)) {
      formData.industryType.forEach((value, index) => {
        submitData.append(`industryType[${index}]`, value);
      });
    } else {
      submitData.append("industryType", formData.industryType);
    }

    submitData.append("companyType", formData.companyType);
    submitData.append("numberOfEmployees", formData.employees);
    submitData.append("tagline", formData.tagline);
    submitData.append("isLGBTQFriendly", formData.isLGBTQ);

    if (typeof formData.contact === "string" && formData.contact.trim() !== "") {
      submitData.append("contact", formData.contact);
    }

    if (typeof formData.website === "string" && formData.website.trim() !== "") {
      submitData.append("website", formData.website);
    }
    if (typeof formData.description === "string" && formData.description.trim() !== "") {
      submitData.append("description", formData.description);
    }

    // if (typeof formData.socialLinks === "string" && formData.socialLinks.trim() !== "") {
    // }

    submitData.append("socialLinks", formData.socialLinks);
    submitData.append("instagram", formData.instagramLink);
    submitData.append("x", formData.twitterLink);
    submitData.append("facebook", formData.facebookLink);

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
    <form className="mt-5 space-y-2" onSubmit={handleSubmit}>
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
        setFormData={setFormData}
        clearFieldError={clearFieldError}
      />

      <CompanySizeForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        clearFieldError={clearFieldError}
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

      {/* LGBTQ Checkbox Section */}
      {formData.country && formData.isLGBTQ === true && (
        <div className="mt-4">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="lgbtq-commitment"
              className="border-grayBlueText/[50%] focus:ring-primary mt-1 h-4 w-4 border bg-gray-100 text-blue-600 focus:ring-1"
              checked={formData.isLGBTQ}
              onChange={(e) => {
                // Only allow checking, prevent unchecking
                if (e.target.checked) {
                  setFormData((prev) => ({ ...prev, isLGBTQ: true }));
                }
              }}
            />
            <label htmlFor="lgbtq-commitment" className="text-sm text-gray-600">
              <p className="text-grayBlueText text-sm text-[13px] leading-[21px]">
                By activating this, Our company commits to being LGBTQ+ inclusive and operating in a
                country that respects LGBTQ+ rights. We agree to provide documentation upon request
                and await admin approval
              </p>
            </label>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        <div className="block space-y-4">
          <button className="btn-fill">
            {" "}
            {isPending ? (
              <div>
                <Loader inverse />
              </div>
            ) : (
              `${t("Next")} `
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreateCompany;
