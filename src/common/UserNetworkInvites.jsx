"use client";
import {
  useAcceptConnection,
  useNetworkInvites,
  useRejectConnection,
} from "@/hooks/user/useNetworkInvites";
import useNetworkInvitesStore from "@/store/networkInvites.store";
import React from "react";
import UserMightKnowSkeleton from "./skeleton/UserMightKnowSkeleton";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import Image from "next/image";
import noImage2 from "@/assets/form/noImage2.webp";
import getImg from "@/lib/getImg";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

const UserNetworkInvites = ({ title }) => {
  const { data: networkInvitesData } = useNetworkInvitesStore();
  const { data, isLoading, isError, error, refetch } = useNetworkInvites();
  const { mutate: acceptConnection, isPending } = useAcceptConnection();
  const {
    mutate: rejectConnection,
    isPending: rejectPending,
  } = useRejectConnection();
  const displayData = networkInvitesData || data;

  const handleInviteAction = (user, action) => {
    console.log(`User ${user} ${action}`);

    if (action == "accept") {
      acceptConnection(
        { id: user.senderDetails._id, role: user.senderDetails.role },
        {
          onSuccess: (res) => {
            if (res.success) {
              refetch();
            }
          },
        }
      );
    } else {
      rejectConnection(
        { id: user.senderDetails._id, role: user.senderDetails.role },
        {
          onSuccess: (res) => {
            if (res.success) {
              refetch();
            }
          },
        }
      );
    }
  };

  if (isLoading || !displayData) {
    return <UserMightKnowSkeleton isreq={true} />;
  }
  if (isError) {
    return (
      <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
        <CardHeading title={title} />
        <div className="w-full py-4 px-2">
          <p className="text-center text-red-500">
            {error?.message || "Failed to load suggestions"}
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
            No Network Invites available at the moment
          </p>
        </div>
      </Card>
    );
  }
  return (
    <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
      <CardHeading title={title} />
      <div className={`w-full py-4 flex flex-col gap-4 px-2`}>
        {displayData?.map((user, index) => {
          const { senderDetails } = user;
          return (
            <div
              key={user._id}
              className="flex items-center justify-between w-full"
            >
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <Image
                    src={
                      senderDetails.profile?.photo
                        ? getImg(senderDetails.profile.photo)
                        : noImage2
                    }
                    alt={senderDetails.profile?.fullName ?? "user"}
                    onError={(e) => (e.target.src = noImage2)}
                    width={40}
                    height={40}
                    className="rounded-full w-full h-full object-cover"
                  />
                  {/* {senderDetails.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border border-white rounded-full" />
                  )} */}
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-medium">
                    {senderDetails.profile?.fullName}
                  </p>
                  <p className="text-xs text-grayBlueText font-normal mt-0.5">
                    {senderDetails.preferences?.jobRole}
                  </p>
                </div>
              </div>

              {/* <button
                onClick={() => handleContactClick(user)}
                disabled={isPending}
                className="bg-secondary border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Contact />
              </button> */}

              <div className="flex gap-2 p-2">
                <button
                  onClick={() => handleInviteAction(user, "reject")}
                  className="border-[0.5px] hover:text-white border-grayBlueText rounded-sm items-center py-1.5 px-1.5 hover:border-red-600 text-grayBlueText hover:bg-red-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <IoClose className="w-[15px] h-[15px] font-medium" />
                </button>
                <button
                  onClick={() => handleInviteAction(user, "accept")}
                  className="border-[0.5px] text-white border-primary bg-primary hover:text-black rounded-sm items-center py-1.5 px-1.5 hover:border-grayBlueText hover:bg-transparent cursor-pointer"
                >
                  <FaCheck className="w-[15px] h-[15px] font-medium" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default UserNetworkInvites;
