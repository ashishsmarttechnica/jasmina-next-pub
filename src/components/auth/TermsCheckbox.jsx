"use client";
import React from "react";
import { useTranslations } from "next-intl";

const TermsCheckbox = ({ isChecked, setIsChecked }) => {
  const t = useTranslations("auth");

  return (
    <div className="flex items-center gap-2">
      <input
        id="default-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border border-grayBlueText/[50%] focus:ring-primary focus:ring-1"
      />
      <label htmlFor="default-checkbox" className="text-grayBlueText text-[13px] text-sm leading-[21px]">
        {t("BySigning")}
        <span className="text-lightBlue underline mx-1">{t("TermsService")}</span>
        {t("and")}
        <span className="text-lightBlue underline mx-1">{t("PrivacyPolicy")}</span>
      </label>
    </div>
  );
};

export default TermsCheckbox;
