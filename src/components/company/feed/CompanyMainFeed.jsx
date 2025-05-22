import MainLayout from "@/layout/MainLayout";
import React from "react";
import UserCompanyProfile from "@/common/UserCompanyProfile";
import CompanySuggestionCard from "@/common/CompanySuggestionCard";
import CompanyFeedPost from "./CompanyFeedPost";
import { useTranslations } from "next-intl";

const CompanyMainFeed = () => {
  const t=useTranslations("CompanyMainFeed");
  return (
    <MainLayout
      leftComponents={[
        <UserCompanyProfile key="left1" />,
        <CompanySuggestionCard
          key="left2"
          title={t("connections")}
          type="connection"
        />,
      ]}
      rightComponents={[
          
        <CompanySuggestionCard

          key="right1"
          title={t("mightKnow")}
          type="suggestion"
          buttonType="contact" 
          postjob="postjob"

        />,
        <CompanySuggestionCard
          key="right2"
          title={t("networkInvites")}
          type="invites"
          buttonType="invite" 
        />,
      ]}
    >
      <CompanyFeedPost />
    </MainLayout>
  );
};

export default CompanyMainFeed;
