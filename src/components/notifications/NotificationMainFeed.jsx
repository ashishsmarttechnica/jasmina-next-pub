import UserCompanyProfile from "@/common/UserCompanyProfile";
import UserMightKnow from "@/common/UserMightKnow";
import MainLayout from "@/layout/MainLayout";
import Notification from "./Notification";
const NotificationMainFeed = () => {
  return (
      <MainLayout
        leftComponents={[<UserCompanyProfile key="left1" />]}
        rightComponents={[<UserMightKnow key="right2" />]}
      >
        <Notification />
      </MainLayout>
  );
};

export default NotificationMainFeed;
