"use client";

import UserMightKnow from "@/common/UserMightKnow";
import { useSingleCompany } from "@/hooks/company/useSingleCompany";
import CompanyConnectionsLayout from "@/layout/CompanyConnectionsLayout";
import { useTranslations } from "next-intl";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import MainCompanyProfile from "../../../common/MainCompanyProfile";
import CompanyBannerProfile from "./CompanyBannerProfile";
import SingleCompanyTab from "./SingleCompanyTab";

const MainSingleCompany = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations("CompanyProfile.singleCompany");
  const userId = params?.id;
  const [mainContent, setMainContent] = useState(null);

  // Check if user came from network invites
  const fromNetworkInvites = searchParams?.get("fromNetworkInvites") === "true";

  const { data: userData, isLoading, error } = useSingleCompany(userId);
  // console.log(userData);
  if (error) {
    return <div>Error loading user data</div>;
  }

  const handleContentChange = (content) => {
    setMainContent(content);
  };

  // Conditionally include MainCompanyProfile based on query parameter
  const rightComponents = [];
  
  if (!fromNetworkInvites) {
    rightComponents.push(
      <MainCompanyProfile
        key="right2"
        title={userData?.companyName}
        userData={userData}
        onContentChange={handleContentChange}
      />
    );
  }
  
  rightComponents.push(<UserMightKnow key="right1" />);

  return (
    <CompanyConnectionsLayout
      RightComponents={rightComponents}
    >
      <div className="space-y-5">
        {mainContent ? (
          mainContent
        ) : (
          <>
            <CompanyBannerProfile userData={userData} isLoading={isLoading} />
            <SingleCompanyTab userData={userData} isLoading={isLoading} />
            {/* <ActivitySection userData={userData} isLoading={isLoading} /> */}
          </>
        )}
      </div>
    </CompanyConnectionsLayout>
  );
};

export default MainSingleCompany;
