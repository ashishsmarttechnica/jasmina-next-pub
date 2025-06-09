import CreateJobButton from "@/common/button/CreateJobButton";
import UserCompanyProfile from "@/common/UserCompanyProfile";
import UserConnections from "@/common/UserConnections";
import UserMightKnow from "@/common/UserMightKnow";
import UserNetworkInvites from "@/common/UserNetworkInvites";
import MainLayout from "@/layout/MainLayout";
import { useTranslations } from "next-intl";
import FeedPost from "@/components/user/feed/FeedPost";
const CompanyMainFeed = () => {
  const t = useTranslations("CompanyMainFeed");
  return (
    <MainLayout
      leftComponents={[
        <UserCompanyProfile key="left1" />,
        <UserConnections key="left2" title={t("connections")} />,
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
