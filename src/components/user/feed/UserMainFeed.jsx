import MainLayout from "@/layout/MainLayout";
import React from "react";
import FeedPost from "./FeedPost";
import Profile from "@/common/Profile";
import UserMightKnow from "@/common/UserMightKnow";
import { useTranslations } from "next-intl";
import UserNetworkInvites from "@/common/UserNetworkInvites";
import UserConnections from "@/common/UserConnections";

const UserMainFeed = () => {
  const t=useTranslations("UserMainFeed");
  return (
    <MainLayout
      leftComponents={[
        <Profile key="left1" />,
        <UserConnections
          key="left2"
          title={t("connections")}

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
      <FeedPost />
    </MainLayout>
  );
};

export default UserMainFeed;
