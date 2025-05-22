"use client";
import React from "react";
import Contact from "@/assets/svg/feed/Contact";
import Image from "next/image";
import Card from "@/common/card/Card";
import CardHeading from "@/common/card/CardHeading";
import { useUserSuggestions } from "@/hooks/user/useUserSuggestions";
import useUserMightKnowStore from "@/store/userMightKnow.store";
import getImg from "@/lib/getImg";
import noImage2 from "@/assets/form/noImage2.webp";
import UserMightKnowSkeleton from "./skeleton/UserMightKnowSkeleton";
import { useCreateConnection } from "@/hooks/connections/useConnections";
import { useTranslations } from "next-intl";

const UserMightKnow = () => {
  const { suggestions, setSuggestions, resetStore } = useUserMightKnowStore();
  const { data, isLoading, isError, error, refetch } = useUserSuggestions();
  const { mutate: createConnection, isPending } = useCreateConnection();
  const t = useTranslations("UserMainFeed");
  const displayData = suggestions?.results || data?.results;

  const handleContactClick = (user) => {
    createConnection(
      { id: user._id, role: user.role },
      {
        onSuccess: (res) => {
          if (res.success) {
            resetStore();
            refetch();
          }
        },
      }
    );
  };

  if (isLoading || !displayData) {
    return <UserMightKnowSkeleton />;
  }

  if (isError) {
    return (
      <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
        <CardHeading title={t("mightKnow")} />
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
        <CardHeading title={t("mightKnow")} />
        <div className="w-full py-4 px-2">
          <p className="text-center text-gray-500">
            No suggestions available at the moment
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
      <CardHeading title={t("mightKnow")} />
      <div className={`w-full py-4 flex flex-col gap-4 px-2`}>
        {displayData?.map((user, index) => (
          <div
            key={user._id}
            className="flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image
                  src={
                    user.profile?.photo ? getImg(user.profile.photo) : noImage2
                  }
                  alt={user.profile?.fullName ?? "user"}
                  onError={(e) => (e.target.src = noImage2)}
                  width={40}
                  height={40}
                  className="rounded-full w-full h-full object-cover"
                />
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border border-white rounded-full" />
                )}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-medium">
                  {user.profile?.fullName}
                </p>
                <p className="text-xs text-grayBlueText font-normal mt-0.5">
                  {user.preferences?.jobRole}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleContactClick(user)}
              disabled={isPending}
              className="bg-secondary border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Contact />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UserMightKnow;
