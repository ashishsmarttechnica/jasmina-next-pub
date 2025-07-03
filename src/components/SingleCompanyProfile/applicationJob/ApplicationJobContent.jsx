"use client";

import MainCompanyProfile from "@/common/MainCompanyProfile";
import UserMightKnow from "@/common/UserMightKnow";
import CompanyConnectionsLayout from "@/layout/CompanyConnectionsLayout";
import { useState } from "react";
import Applications from "../applications/Applications";

const ApplicationJobContent = () => {
  const [mainContent, setMainContent] = useState(null);
  const userData = {
    companyName: "Company Name",
  };

  const handleContentChange = (content) => {
    setMainContent(content);
  };

  return (
    <>
      {/* <div className="min-h-screen w-full"> */}
      <CompanyConnectionsLayout
        RightComponents={[
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
          <Applications />
        </div>
      </CompanyConnectionsLayout>
      {/* </div> */}
    </>
  );
};

export default ApplicationJobContent;
