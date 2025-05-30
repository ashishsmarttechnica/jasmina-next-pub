"use client";
import GoogleIcon from "@/assets/form/GoogleIcon.png";
import { useTranslations } from "next-intl";
import Image from "next/image";

const GoogleSignInButton = () => {
  const t = useTranslations("auth");

  return (
    <div className="bg-gray mx-auto flex max-w-65.5 cursor-pointer items-center justify-center rounded-md py-[13px]">
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
        width={24}
        height={24}
        className="h-auto w-6" // maintain aspect ratio
      />
    </div>
  );
};

export default GoogleSignInButton;
