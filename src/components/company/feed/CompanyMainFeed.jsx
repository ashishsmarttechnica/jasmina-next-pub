import MainLayout from "@/layout/MainLayout";
import React from "react";
import UserCompanyProfile from "@/common/UserCompanyProfile";
import CompanySuggestionCard from "@/common/CompanySuggestionCard";
import CompanyFeedPost from "./CompanyFeedPost";

const CompanyMainFeed = () => {
 
  return (
    <MainLayout
      leftComponents={[
        <UserCompanyProfile key="left1" />,
        <CompanySuggestionCard
          key="left2"
          title="Connections"
          type="connection"
        />,
      ]}
      rightComponents={[
          
        <CompanySuggestionCard

          key="right1"
          title="People you might know"
          type="suggestion"
          buttonType="contact" 
          postjob="postjob"

        />,
        <CompanySuggestionCard
          key="right2"
          title="Network Invites"
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
