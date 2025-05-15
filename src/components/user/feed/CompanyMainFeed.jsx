import Contact from "@/assets/svg/feed/Contact";
import UserSuggestionCard from "@/common/UserSuggestionCard";
import MainLayout from "@/layout/MainLayout";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import FeedPost from "./FeedPost";
import UserCompanyProfile from "@/common/UserCompanyProfile";
import CompanySuggestionCard from "@/common/CompanySuggestionCard";

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
        />,
        <CompanySuggestionCard
          key="right2"
          title="Network Invites"
          type="invites"
          buttonType="invite" 
        />,
      ]}
    >
      <FeedPost />
    </MainLayout>
  );
};

export default CompanyMainFeed;
