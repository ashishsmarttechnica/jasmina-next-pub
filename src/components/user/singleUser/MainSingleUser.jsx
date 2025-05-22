import UserMightKnow from "@/common/UserMightKnow";
import ConnectionsLayout from "@/layout/ConnectionsLayout";
import React from "react";
import UserBannerProfile from "./UserBannerProfile";
import ActivitySection from "./ActivitySection";

const MainSingleUser = () => {
  return (
    <ConnectionsLayout RightComponents={[<UserMightKnow key="right1" />]}>
      <div className="space-y-5">
        <UserBannerProfile />
          
        <ActivitySection />
      </div>
    </ConnectionsLayout>
  );
};

export default MainSingleUser;
