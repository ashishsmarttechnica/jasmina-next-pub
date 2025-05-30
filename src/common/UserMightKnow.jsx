"use client";
import Contact from "@/assets/svg/feed/Contact";
import Card from "@/common/card/Card";
import CardHeading from "@/common/card/CardHeading";
import { useCreateConnection } from "@/hooks/connections/useConnections";
import { useUserSuggestions } from "@/hooks/user/useUserSuggestions";
import { useRouter } from "@/i18n/navigation";
import capitalize from "@/lib/capitalize";
import getImg from "@/lib/getImg";
import useUserMightKnowStore from "@/store/userMightKnow.store";
import { useTranslations } from "next-intl";
import { FaBuilding, FaUser } from "react-icons/fa";
import ImageFallback from "./shared/ImageFallback";
import UserMightKnowSkeleton from "./skeleton/UserMightKnowSkeleton";

const UserMightKnow = () => {
  const { suggestions, setSuggestions, resetStore } = useUserMightKnowStore();
  const { data, isLoading, isError, error, refetch } = useUserSuggestions();
  const {
    mutate: createConnection,
    isPending,
    isLoading: isCreateConnectionLoading,
  } = useCreateConnection();
  const t = useTranslations("UserMainFeed");
  const displayData = suggestions?.results || data?.results;
  const router = useRouter();

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
        icon: <FaUser className="h-3 w-3" />,
      },
      Company: {
        image: item.logoUrl,
        name: item.companyName,
        subtitle: item.industryType,
        showOnline: false,
        online: false,
        type: "Company",
        typeColor: "text-green-600",
        icon: <FaBuilding className="h-3 w-3" />,
      },
    };

    return configs[item.type] || configs.User;
  };

  const handleContactClick = (item) => {
    if (isCreateConnectionLoading) return;
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

  const handleUserProfile = (user) => {
    if (capitalize(user.role) === "User") {
      router.push(`/single-user/${user._id}`);
    } else {
      router.push(`/company/single-company/${user._id}`);
    }
  };

  if (isLoading || !displayData) {
    return <UserMightKnowSkeleton />;
  }

  if (isError) {
    return (
      <Card className="md:w-full md:max-w-full xl:max-w-[266px]">
        <CardHeading title={t("mightKnow")} />
        <div className="w-full px-2 py-4">
          <p className="text-center text-red-500">
            {error?.message || "Failed to load suggestions"}
          </p>
        </div>
      </Card>
    );
  }

  if (!displayData.length) {
    return (
      <Card className="md:w-full md:max-w-full xl:max-w-[266px]">
        <CardHeading title={t("mightKnow")} />
        <div className="w-full px-2 py-4">
          <p className="text-center text-gray-500">No suggestions available at the moment</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="md:w-full md:max-w-full xl:max-w-[266px]">
      <CardHeading title={t("mightKnow")} />
      <div className="flex w-full flex-col gap-2 px-2 py-4">
        {displayData?.map((item) => {
          const config = getItemConfig(item);
          return (
            <div key={item._id} className="flex w-full items-center justify-between p-2">
              <div className="flex min-w-0 items-center gap-2">
                <div
                  className="relative h-10 w-10 cursor-pointer"
                  onClick={() => handleUserProfile(item)}
                >
                  <ImageFallback
                    src={config.image && getImg(config.image)}
                    alt={config.name ?? "item"}
                    width={32}
                    height={32}
                    loading="lazy"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  {config.showOnline && config.online && (
                    <span className="bg-primary absolute right-0 bottom-0 h-2 w-2 rounded-full border border-white" />
                  )}
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="cursor-pointer truncate text-xs font-medium"
                      onClick={() => handleUserProfile(item)}
                    >
                      {config.name}
                    </div>
                    <span className={config.typeColor}>{config.icon}</span>
                  </div>
                  <p className="text-grayBlueText truncate text-[10px] font-normal">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleContactClick(item)}
                disabled={isCreateConnectionLoading}
                className={`rounded-sm border p-1.5 transition-colors duration-300 ${
                  isCreateConnectionLoading
                    ? "cursor-not-allowed bg-gray-300 opacity-50"
                    : "bg-secondary hover:border-primary border-transparent hover:bg-transparent"
                }`}
              >
                <Contact className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default UserMightKnow;
