"use client";
import React from "react";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import Image from "next/image";
import noImage2 from "@/assets/form/noImage2.webp";
import getImg from "@/lib/getImg";
import UserMightKnowSkeleton from "./skeleton/UserMightKnowSkeleton";
import { useConnections } from "@/hooks/connections/useConnections";
import useConnectionsStore from "@/store/connections.store";

const UserConnections = ({ title }) => {
  const { connections } = useConnectionsStore();
  const { data, isLoading, isError, error } = useConnections("User", 1);
  const displayData = connections?.length ? connections : data?.connections;


  console.log(displayData , "displayData");


  if (isLoading || !displayData) {
    return <UserMightKnowSkeleton  isconnection={true}/>;
  }

  if (isError) {
    return (
      <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
        <CardHeading title={title} />
        <div className="w-full py-4 px-2">
          <p className="text-center text-red-500">
            {error?.message || "Failed to load connections"}
          </p>
        </div>
      </Card>
    );
  }

  if (!displayData.length) {
    return (
      <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
        <CardHeading title={title} />
        <div className="w-full py-4 px-2">
          <p className="text-center text-gray-500">
            No connections available at the moment
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
      <CardHeading title={title} />
      <div className={`w-full py-4 px-5 flex flex-col gap-4`}>
        {displayData.slice(0, 5).map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src={user.details?.profile?.photo ? getImg(user.details?.profile?.photo) : noImage2}
                  alt={user.details?.profile?.fullName ?? "user"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = noImage2.src;
                  }}
                />

              </div>
              <div className="text-left">
                <p className="text-[13px] font-medium">
                  {user.details?.profile?.fullName}
                </p>
                <p className="text-xs text-grayBlueText font-normal mt-0.5">
                  {user.details?.preferences?.jobRole}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserConnections;
