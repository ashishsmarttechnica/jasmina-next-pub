import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";
// import ChatConnection from "../../../../components/chat/defaultChat/ChatConnection";
import ChatMainFeed from "../../../../components/chat/ChatMainPage";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/",
});


const page = () => {
  return (
    <div className="py-5">
        <ChatMainFeed/>
      {/* <JobsMainPage /> */}
    </div>
  );
};

export default page;
