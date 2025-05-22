"use client";
import React from "react";
import Contact from "@/assets/svg/feed/Contact";
import Card from "@/common/card/Card";
import CardHeading from "@/common/card/CardHeading";
import { useUserSuggestions } from "@/hooks/user/useUserSuggestions";
import useUserMightKnowStore from "@/store/userMightKnow.store";
import getImg from "@/lib/getImg";
import noImage2 from "@/assets/form/noImage2.webp";
import UserMightKnowSkeleton from "./skeleton/UserMightKnowSkeleton";
import { useCreateConnection } from "@/hooks/connections/useConnections";
import { useTranslations } from "next-intl";
import { FaUser, FaBuilding } from "react-icons/fa";
import ImageFallback from "./shared/ImageFallback";

const UserMightKnow = () => {
  const { suggestions, setSuggestions, resetStore } = useUserMightKnowStore();
  const { data, isLoading, isError, error, refetch } = useUserSuggestions();
  const { mutate: createConnection, isPending } = useCreateConnection();
  const t = useTranslations("UserMainFeed");
  const displayData = suggestions?.results || data?.results;

  const getItemConfig = (item) => {
    const configs = {
      User: {
        image: item.profile?.photo,
        name: item.profile?.fullName,
        subtitle: item.preferences?.jobRole,
        showOnline: true,
        online: item.online,
        type: "User",
        typeColor: "text-blue-600",
        icon: <FaUser className="w-3 h-3" />,
      },
      Company: {
        image: item.logoUrl,
        name: item.companyName,
        subtitle: item.industryType,
        showOnline: false,
        online: false,
        type: "Company",
        typeColor: "text-green-600",
        icon: <FaBuilding className="w-3 h-3" />,
      },
    };

    return configs[item.type] || configs.User;
  };

  const handleContactClick = (item) => {
    createConnection(
      { id: item._id, role: item.role },
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
      <div className="w-full py-4 flex flex-col gap-2 px-2">
        {displayData?.map((item) => {
          const config = getItemConfig(item);
          return (
            <div key={item._id} className="flex items-center justify-between w-full p-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative w-8 h-8">
                  <ImageFallback
                    src={config.image && getImg(config.image) }
                    alt={config.name ?? "item"}
                    width={32}
                    height={32}
                    loading="lazy"
                    className="rounded-full w-full h-full object-cover"
                  />
                  {config.showOnline && config.online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-primary border border-white rounded-full" />
                  )}
                </div>
                <div className="text-left min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-medium truncate">{config.name}</p>
                    <span className={config.typeColor}>{config.icon}</span>
                  </div>
                  <p className="text-[10px] text-grayBlueText font-normal truncate">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleContactClick(item)}
                disabled={isPending}
                className="bg-secondary border border-transparent rounded-sm p-1.5 hover:bg-transparent hover:border-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Contact className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default UserMightKnow;
