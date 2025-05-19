"use client";
import React, { useState } from "react";
import useSignInValidationForm from "@/hooks/validation/auth/useSingInValidationForm";
import InputField from "../form/InputField";
import PasswordField from "../form/PasswordField";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AccountTypeSelector from "./AccountTypeSelector";
import TermsCheckbox from "./TermsCheckbox";
import GoogleSignInButton from "./GoogleSignInButton";
import useSignup from "@/hooks/auth/useSignup";
import { toast } from "react-toastify";
import ButtonLoader from "@/common/ButtonLoader";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    accountType: "user",
  });
  const t = useTranslations("auth");
  const { errors, validateForm, clearFieldError } = useSignInValidationForm();
  const { mutate, isPending } = useSignup();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim() !== "") clearFieldError(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm(formData)) return;
    if (!isChecked) {
      toast.warning(t("checkSingUp"));
      return;
    }


    if (!formData.accountType) {
      toast.error(t("PleaseSelectAccountType"));
      return;
    }

    mutate(formData);
  };

  return (
    <form className="mt-7.5" onSubmit={handleSubmit}>
      <InputField
        label={t("EmailAddress")}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <PasswordField
        label={t("Password")}
        name="password"
        value={formData.password}
        onChange={handleChange}
        show={showPassword}
        toggle={() => setShowPassword(!showPassword)}
        error={errors.password}
      />

      <AccountTypeSelector
        value={formData.accountType}
        onChange={(val) =>
          setFormData((prev) => ({ ...prev, accountType: val }))
        }
      />

      <TermsCheckbox isChecked={isChecked} setIsChecked={setIsChecked} />

      <div className="mt-3 sm:mt-[40px]">
       
          <ButtonLoader
          type="submit"
          label={t("SignUp")}
          isPending={isPending}
        />

        <div className="text-center text-base text-grayBlueText my-[15px] leading-[18px]">
          {t("or")}
        </div>

        <GoogleSignInButton />

        <div className="text-center mt-7.5">
          <p className="text-grayBlueText text-base leading-[18px]">
            {t("AlreadyHaveAccount")}
            <Link href="/login" className="text-lightBlue cursor-pointer">
              {" "}
              {t("Login")}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
