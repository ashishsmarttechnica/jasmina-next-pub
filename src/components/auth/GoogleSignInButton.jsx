"use client";
import React from "react";
import Image from "next/image";
import GoogleIcon from "@/assets/form/GoogleIcon.png";
import { useTranslations } from "next-intl";

const GoogleSignInButton = () => {
  const t = useTranslations("auth");

  return (
    <div className="flex items-center justify-center bg-gray max-w-65.5 py-[13px] mx-auto rounded-md cursor-pointer">
      {/* <Image
        src={GoogleIcon}
        alt={t("GoogleIconAltImgSignUp")}
        width={24}
        height={25}
        style={{ height: "auto" }}
      /> */}
      <Image
        src={GoogleIcon}
        alt={t("GoogleIconAltImgSignUp")}
        className="w-6 h-auto" // maintain aspect ratio
      />
    </div>
  );
};

export default GoogleSignInButton;
