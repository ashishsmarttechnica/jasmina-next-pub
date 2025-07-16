import CreateJobButton from "@/common/button/CreateJobButton";
import UserCompanyProfile from "@/common/UserCompanyProfile";
import UserConnections from "@/common/UserConnections";
import UserMightKnow from "@/common/UserMightKnow";
import UserNetworkInvites from "@/common/UserNetworkInvites";
import FeedPost from "@/components/user/feed/FeedPost";
import MainLayout from "@/layout/MainLayout";
import { useTranslations } from "next-intl";
import CompanyConnections from "../../../common/CompanyConnections";
const CompanyMainFeed = () => {
  const t = useTranslations("CompanyMainFeed");
  return (
    <MainLayout
      leftComponents={[
        <UserCompanyProfile key="left1" />,
        <UserConnections key="left2" title={t("userConnections")} />,
        <CompanyConnections key="left3" title={t("companyConnections")} />,
      ]}
      rightComponents={[
        <CreateJobButton key="right1" />,
        <UserMightKnow key="right2" />,
        <UserNetworkInvites
          key="right3"
          title={t("networkInvites")}
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
