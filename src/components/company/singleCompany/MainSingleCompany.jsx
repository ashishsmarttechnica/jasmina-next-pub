"use client";

import UserMightKnow from "@/common/UserMightKnow";
import { useSingleCompany } from "@/hooks/company/useSingleCompany";
import CompanyConnectionsLayout from "@/layout/CompanyConnectionsLayout";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import MainCompanyProfile from "../../../common/MainCompanyProfile";
import CompanyBannerProfile from "./CompanyBannerProfile";
import SingleCompanyTab from "./SingleCompanyTab";

const MainSingleCompany = () => {
  const params = useParams();
  const t = useTranslations("CompanyProfile.singleCompany");
  const userId = params?.id;
  const [mainContent, setMainContent] = useState(null);

  const { data: userData, isLoading, error } = useSingleCompany(userId);
  console.log(userData);
  if (error) {
    return <div>Error loading user data</div>;
  }

  const handleContentChange = (content) => {
    setMainContent(content);
  };

  return (
    <CompanyConnectionsLayout
      RightComponents={[
        // <UserConnections key="right2" title={t("connections")} />,
        <MainCompanyProfile
          key="right2"
          title={userData?.companyName}
          userData={userData}
          onContentChange={handleContentChange}
        />,
        <UserMightKnow key="right1" />,
      ]}
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
