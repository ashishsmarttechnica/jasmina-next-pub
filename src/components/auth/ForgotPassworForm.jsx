"use client";
import React, { useState } from "react";
import InputField from "../form/InputField";
import useForgotPassValidationForm from "@/hooks/validation/auth/useForgotPassValidationForm";
import { useTranslations } from "next-intl";

const ForgotPassworForm = () => {
    const t = useTranslations("auth")
  const [formData, setFormData] = useState({ email: "" });
  const {
    errors,
    validateForm,
    clearFieldError,
  } = useForgotPassValidationForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") clearFieldError(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
  };

  return (
    <form className="mt-7.5" onSubmit={handleSubmit}>
      <InputField
        label={t("forgotPassworFormEmail")}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        isForgot={true}
      />
      <div className="mt-3 sm:mt-7.5">
        <button className="w-full p-1 sm:p-2 bg-primary text-white rounded-md text-xl leading-[27px]">
         {t("ResetLink")}
        </button>

        <div className="text-center mt-5">
          <p className="text-grayBlueText text-[13px] leading-[15px] ">
           {t("forgotLastText")}
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassworForm;
