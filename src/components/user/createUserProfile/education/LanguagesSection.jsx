import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Selecter from "@/common/Selecter";
import { useTranslations } from "next-intl";
import InputField from "@/common/InputField";

const LanguagesSection = ({
  languagesList,
  proficiencyOptions,
  addSection,
  removeSection,
  handleChange,
  errors,
  clearFieldError,
}) => {
  const t = useTranslations("UserProfile.education");
  return (
    <div>
      <div className="my-2 flex items-center justify-between">
        <p className="text-[15px] font-medium text-[#0f0f0f]">
          {t("languages")}
        </p>
        <FiPlusSquare
          onClick={() => addSection("languages")}
          className="w-[19px] h-[19px] cursor-pointer"
        />
      </div>
      {languagesList.map((language, index) => (
        <div
          key={index}
          className={`${
            index > 0 ? "border border-[#ddd] relative" : ""
          } grid sm:grid-cols-2 grid-cols-1 gap-x-4 gap-y-2 ${
            index > 0 ? "p-4 rounded-md mt-2" : ""
          }`}
        >
          {index > 0 && (
            <RxCross2
              onClick={() => removeSection("languages", index)}
              className="absolute top-2 right-2 cursor-pointer"
            />
          )}

          <InputField
            label={`${t("languagesList")}*`}
            name={`languages-${index}`}
            type="text"
            value={language.languages}
            onChange={(e) =>
              handleChange("languagesList", index, "languages", e.target.value)
            }
            onBlur={() => clearFieldError(`language-${index}-languages`)}
            error={errors[`language-${index}-languages`]}
          />

          <div className="space-y-1">
            <label className="text-[14px] text-grayBlueText">
              {`${t("proficiency")}*`}
            </label>
            <Selecter
              name="proficiency"
              options={proficiencyOptions}
              value={language.proficiency}
              onChange={(e) =>
                handleChange(
                  "languagesList",
                  index,
                  "proficiency",
                  e.target.value,
                  true,
                  "language"
                )
              }
            />
            {errors[`language-${index}-proficiency`] && (
              <p className="text-red-500">
                {errors[`language-${index}-proficiency`]}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LanguagesSection;
