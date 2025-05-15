import React from "react";
import { FiPlusSquare } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import Selecter from "@/common/Selecter";
import { useTranslations } from "next-intl";
import InputField from "@/common/InputField";

const SkillsSection = ({
  skillsList,
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
        <p className="text-[15px] font-semibold text-[#0f0f0f]">
          {`${t("skills")}*`}
        </p>
        <FiPlusSquare
          onClick={() => addSection("skills")}
          className="w-[19px] h-[19px] cursor-pointer"
        />
      </div>
      {skillsList.map((skill, index) => (
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
              onClick={() => removeSection("skills", index)}
              className="absolute top-2 right-2 cursor-pointer"
            />
          )}

          <InputField
            label={`${t("skillName")} *`}
            name={`skill-${index}`}
            type="text"
            value={skill.skill}
            onChange={(e) =>
              handleChange("skillsList", index, "skill", e.target.value)
            }
            onBlur={() => clearFieldError(`skill-${index}-skill`)}
            error={errors[`skill-${index}-skill`]}
          />
          <div className="space-y-1">
            <label className="text-[14px] text-grayBlueText">
              {`${t("proficiency")}*`}
            </label>
            <Selecter
              name="proficiency"
              options={proficiencyOptions}
              value={skill.proficiency}
              onChange={(e) =>
                handleChange(
                  "skillsList",
                  index,
                  "proficiency",
                  e.target.value,
                  true,
                  "skill"
                )
              }
              error={errors[`skill-${index}-proficiency`]}
            />
          </div>

          <InputField
            label={`${t("experience")}*`}
            name={`experience-${index}`}
            type="number"
            min="0"
            step="0.5"
            value={skill.experience}
            onChange={(e) =>
              handleChange("skillsList", index, "experience", e.target.value)
            }
            onBlur={() => clearFieldError(`skill-${index}-experience`)}
            error={errors[`skill-${index}-experience`]}
          />

          {/* Category */}
          <InputField
            label={`${t("category")}*`}
            name={`category-${index}`}
            type="text"
            value={skill.category}
            onChange={(e) =>
              handleChange("skillsList", index, "category", e.target.value)
            }
            onBlur={() => clearFieldError(`skill-${index}-category`)}
            error={errors[`skill-${index}-category`]}
          />
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
