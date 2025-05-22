import MainLayout from "@/layout/MainLayout";
import React from "react";
import UserCompanyProfile from "@/common/UserCompanyProfile";
import CompanySuggestionCard from "@/common/CompanySuggestionCard";
import CompanyFeedPost from "./CompanyFeedPost";
import { useTranslations } from "next-intl";
import UserMightKnow from "@/common/UserMightKnow";
import UserNetworkInvites from "@/common/UserNetworkInvites";

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
        <UserMightKnow key="right1" />,
        <UserNetworkInvites
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
