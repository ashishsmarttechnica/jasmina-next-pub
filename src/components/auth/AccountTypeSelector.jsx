"use client";
import React from "react";
import { useTranslations } from "next-intl";

const AccountTypeSelector = ({ value, onChange }) => {
  const t = useTranslations("auth");

  return (
    <div className="mb-4">
      <label className="text-[15px] text-grayBlueText">
        {t("AccountType")}
      </label>
      <div className="flex gap-4 mt-1 w-[50%]">
        {["user", "company"].map((type) => (
          <div className="flex-1" key={type}>
            <input
              type="radio"
              id={type}
              name="accountType"
              value={type}
              className="hidden peer"
              checked={value === type}
              onChange={() => onChange(type)}
            />
            <label
              htmlFor={type}
              className="flex items-center justify-center p-1 text-grayBlueText border border-grayBlueText/[50%] rounded-md cursor-pointer
                transition-all duration-300 ease-in-out hover:border-primary hover:bg-secondary hover:peer-checked:text-primary
                peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary"
            >
              <div className="flex flex-col items-center gap-1">
                <span className="font-medium capitalize">
                  {t(type === "user" ? "UserAccount" : "CompanyAccount")}
                </span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountTypeSelector;
