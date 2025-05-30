"use client";

import UserMightKnow from "@/common/UserMightKnow";
import { useSingleUser } from "@/hooks/user/useSingleUser";
import ConnectionsLayout from "@/layout/ConnectionsLayout";
import { useParams } from "next/navigation";
import { useState } from "react";
import ActivitySection from "./ActivitySection";
import SingleUserTab from "./SingleUserTab";
import UserBannerProfile from "./UserBannerProfile";

const MainSingleUser = () => {
  const params = useParams();
  const [opens, setOpens] = useState(false);
  const [descriptionData, setDescriptionData] = useState(null);
  const userId = params?.id;

  const { data: userData, isLoading, error } = useSingleUser(userId);

  const handleDisc = (data) => {
    setOpens(true);
    setDescriptionData(data);
  };

  const handleCloses = () => {
    setOpens(false);
  };

  if (error) return <div>Error loading user data</div>;

  return (
    <ConnectionsLayout RightComponents={[<UserMightKnow key="right1" />]}>
      <div className="space-y-5">
        <UserBannerProfile
          userData={userData}
          isLoading={isLoading}
          handleDisc={handleDisc}
          opens={opens}
          descriptionData={descriptionData}
          handleCloses={handleCloses}
        />
        <SingleUserTab userData={userData} isLoading={isLoading} />
        <ActivitySection userData={userData} isLoading={isLoading} />
      </div>
    </ConnectionsLayout>
  );
};
export default MainSingleUser;
