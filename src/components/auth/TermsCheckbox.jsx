"use client";
import { useTranslations } from "next-intl";

const TermsCheckbox = ({ isChecked, setIsChecked, error }) => {
  const t = useTranslations("auth");

  return (
    <>
      <div className="flex items-center gap-2">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="border-grayBlueText/[50%] focus:ring-primary h-4 w-4 border bg-gray-100 text-blue-600 focus:ring-1"
        />
        <label
          htmlFor="default-checkbox"
          className="text-grayBlueText text-sm text-[13px] leading-[21px]"
        >
          {t("BySigning")}
          <span className="text-lightBlue mx-1 underline">{t("TermsService")}</span>
          {t("and")}
          <span className="text-lightBlue mx-1 underline">{t("PrivacyPolicy")}</span>
        </label>
      </div>
      {error && <div className="mt-1 text-[13px] text-red-600">{error}</div>}
    </>
  );
};

export default TermsCheckbox;
