import Contact from "@/assets/svg/feed/Contact";
import UserSuggestionCard from "@/common/UserSuggestionCard";
import MainLayout from "@/layout/MainLayout";
import React from "react";
import FeedPost from "./FeedPost";
import Profile from "@/common/Profile";

const UserMainFeed = () => {
 
  return (
    <MainLayout
      leftComponents={[
        <Profile key="left1" />,
        <UserSuggestionCard
          key="left2"
          title="Connections"
          type="connection"
        />,
      ]}
      rightComponents={[
        <UserSuggestionCard
          key="right1"
          title="People you might know"
          type="suggestion"
          buttonType="contact" 
        />,
        <UserSuggestionCard
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

export default UserMainFeed;
