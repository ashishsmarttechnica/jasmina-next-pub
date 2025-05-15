import React from "react";
import ReusableForm from "@/components/form/ReusableForm";
import { getSeoMeta } from "@/lib/seoMetadata";
import ForgotPassworForm from "@/components/auth/ForgotPassworForm";
import { useTranslations } from "next-intl";

export const metadata = getSeoMeta({
  title: "Jasmina Login",
  path: "/login",
});

const ForgotPasswordPage = () => {
  const t = useTranslations("auth");

  return (
    <ReusableForm
      title={t("ForgotPasswordTitle")}
      subtitle={t("ForgotPasswordSubTitle")}
    >
      <ForgotPassworForm />
    </ReusableForm>
  );
};

export default ForgotPasswordPage;
