"use client";
import UserMightKnow from "@/common/UserMightKnow";
import ConnectionsLayout from "@/layout/ConnectionsLayout";
import UserNetworkInvites from "../../common/UserNetworkInvites";
import ConnectionsContent from "./ConnectionsContent";

const ConnectionsDetail = () => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <ConnectionsLayout RightComponents={[<UserMightKnow key="right1" />]}>
        <div className="space-y-6">
          <ConnectionsContent />


          <div className="block lg:hidden">
            <UserMightKnow title="People You Might Know" />
          </div>
          <div className="block lg:hidden">
            <UserNetworkInvites title="Network Invites" />
          </div>
        </div>
      </ConnectionsLayout>
    </div>
  );
};

export default ConnectionsDetail;
