"use client";

import UserMightKnow from "@/common/UserMightKnow";
// import ActivitySection from "./ActivitySection";

import { useParams } from "next/navigation";
import UserConnections from "@/common/UserConnections";
import { useSingleUser } from "@/hooks/user/useSingleUser";
import CompanyConnectionsLayout from "@/layout/CompanyConnectionsLayout";
import CompanyBannerProfile from "./CompanyBannerProfile";
import SingleCompanyTab from "./SingleCompanyTab";
import { useSingleCompany } from "@/hooks/company/useSingleCompany";
import { useTranslations } from "next-intl";

const MainSingleCompany = () => {
  const params = useParams();
const t=useTranslations('CompanyProfile.singleCompany');
  const userId = params?.id;

  const { data: userData, isLoading, error } = useSingleCompany(userId);

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <CompanyConnectionsLayout
      RightComponents={[
        <UserConnections key="right2" title={t("connections")} />,
        <UserMightKnow key="right1" />,
      ]}
    >
      <div className="space-y-5">
        <CompanyBannerProfile  userData={userData} isLoading={isLoading} />
        <SingleCompanyTab userData={userData}  isLoading={isLoading}/>
        {/* <ActivitySection userData={userData} isLoading={isLoading} /> */}
      </div>
    </CompanyConnectionsLayout>
  );
};

export default MainSingleCompany;
