import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";
import NotificationMainFeed from "../../../../components/notifications/NotificationMainFeed";
// import ChatConnection from "../../../../components/chat/defaultChat/ChatConnection";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/notification",
});


const page = () => {
  return (
    <div className="py-5">
        <NotificationMainFeed/>
      {/* <JobsMainPage /> */}
    </div>
  );
};

export default page;
