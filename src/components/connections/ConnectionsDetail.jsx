"use client";
import React, { useState } from "react";
import ConnectionsLayout from "@/layout/ConnectionsLayout";
import UserMightKnow from "@/common/UserMightKnow";
import ConnectionsContent from "./ConnectionsContent";

const ConnectionsDetail = () => {
  return (
    <ConnectionsLayout RightComponents={[<UserMightKnow key="right1" />]}>
      <ConnectionsContent />
    </ConnectionsLayout>
  );
};

export default ConnectionsDetail;
