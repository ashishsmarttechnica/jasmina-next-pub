"use client";
import ImageFallback from "@/common/shared/ImageFallback";
import UserMightKnowSkeleton from "@/common/skeleton/UserMightKnowSkeleton";
import { useCreateConnection } from "@/hooks/connections/useConnections";
import { useUserSuggestions } from "@/hooks/user/useUserSuggestions";
import { useRouter } from "@/i18n/navigation";
import getImg from "@/lib/getImg";
import useUserMightKnowStore from "@/store/userMightKnow.store";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaBuilding, FaUser } from "react-icons/fa";

const PeopleTab = () => {
  const { suggestions, setSuggestions, resetStore } = useUserMightKnowStore();
  const { data, isLoading, isError, error } = useUserSuggestions();
  const { mutate: createConnection, isPending } = useCreateConnection();
  const t= useTranslations("CompanyProfile.singleCompany");
  const displayData = suggestions?.results || data?.results;
  const router = useRouter();
  const getItemConfig = (item) => {
    const configs = {
      User: {
        image: item.profile?.photo,
        name: item.profile?.fullName,
        subtitle: item.preferences?.jobRole,
        location: item.profile?.location,
        showOnline: true,
        online: item.online,
        type: "User",
        typeColor: "text-blue-600",
        icon: <FaUser className="h-3 w-3" />,
      },
      Company: {
        image: item.logoUrl,
        name: item.companyName,
        subtitle: item.industryType,
        location: item.fullAddress,
        showOnline: false,
        online: false,
        type: "Company",
        typeColor: "text-green-600",
        icon: <FaBuilding className="h-3 w-3" />,
      },
    };

    return configs[item.type] || configs.User;
  };

  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleRemoveClick = () => {
    setSelectedItemId(null); // Just close options
  };

  const handleUserProfile = (user) => {
    router.push(`/single-user/${user._id}`);
  };

  if (isLoading || !displayData) {
    return <UserMightKnowSkeleton />;
  }

  if (isError) {
    return (
      <div className="w-full px-2 py-4">
        <p className="text-center text-red-500">{error?.message || "Failed to load suggestions"}</p>
      </div>
    );
  }

  if (!displayData.length) {
    return (
      <div className="w-full px-2 py-4">
        <p className="my-20 text-center text-gray-500">{t("nosuggestion")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2 px-4 py-2">
        {displayData?.map((item) => {
          const config = getItemConfig(item);
          const isSelected = selectedItemId === item._id;
          return (
            <div
              key={item._id}
              className="flex w-full flex-col items-start justify-between gap-3 border-b border-black/10 p-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-0"
            >
              <div className="flex w-full min-w-0 items-start gap-3 sm:items-center sm:gap-4">
                <div
                  className="relative flex-shrink-0 cursor-pointer"
                  onClick={() => handleUserProfile(item)}
                >
                  <ImageFallback
                    src={config.image && getImg(config.image)}
                    width={80}
                    height={80}
                    alt={config.name ?? "item"}
                    loading="lazy"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  {config.showOnline && config.online && (
                    <span className="bg-primary absolute right-0 bottom-0 h-2 w-2 rounded-full border border-white" />
                  )}
                </div>

                <div className="flex min-w-0 flex-grow flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <p
                      className="cursor-pointer truncate text-[16px] font-medium"
                      onClick={() => handleUserProfile(item)}
                    >
                      {config.name}
                    </p>
                    <span className={`text-[16px] ${config.typeColor}`}>{config.icon}</span>
                  </div>
                  <p className="text-grayBlueText truncate text-[14px] font-normal">
                    {config.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <CiLocationOn className="text-grayBlueText h-3 w-3 sm:h-4 sm:w-4" />
                    <p className="text-grayBlueText truncate text-[12px] font-normal">
                      {config.location || "Location not specified"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex w-full items-center justify-start sm:w-auto sm:justify-end">
                {isSelected ? (
                  <>
                    <button
                      disabled={isPending}
                      className="text-primary border-primary hover:bg-primary mx-2 rounded-xs border px-4 py-1 text-[12px] transition-colors duration-300 hover:text-white sm:text-[14px]"
                    >
                      {t("connect")}
                    </button>
                    <button className="text-grayBlueText border-grayBlueText rounded-xs border px-4 py-1 text-[12px] transition-colors duration-300 hover:bg-transparent sm:text-[14px]">
                      {t("remove")}
                    </button>
                  </>
                ) : (
                  <button className="bg-primary hover:text-primary hover:border-primary rounded-xs border border-transparent px-4 py-1 text-[12px] text-white transition-colors duration-300 hover:bg-transparent sm:text-[14px]">
                     {t("connect")}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
//
export default PeopleTab;
