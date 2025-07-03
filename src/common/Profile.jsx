"use client";
import noImage2 from "@/assets/feed/no-img.png";
import { useRouter } from "@/i18n/navigation";
import getImg from "@/lib/getImg";
import useAuthStore from "@/store/auth.store";
import { useTranslations } from "next-intl";
import Card from "./card/Card";
import ImageFallback from "./shared/ImageFallback";
import FeedProfileLeftSkeleton from "./skeleton/FeedProfileLeftSkeleton";
function Profile() {
  const { user, isAuthLoading } = useAuthStore();
  const t = useTranslations("FeedProfileLeft");
  const router = useRouter();
  console.log(getImg(user?.profile?.photo));

  if (isAuthLoading && !user) {
    return <FeedProfileLeftSkeleton />;
  }

  return (
    <Card className="md:w-full md:max-w-full xl:max-w-[266px]">
      <div className="flex flex-col items-center justify-center p-6">
        <ImageFallback
          src={user?.profile?.photo && getImg(user?.profile?.photo)}
          fallbackSrc={noImage2}
          width={130}
          height={130}
          alt={user?.profile?.fullName ?? "user"}
          className="mb-[25px] h-[130px] w-[130px] rounded-full"
        />
        <h2 className="mb-2 text-center text-xl leading-[1.3] font-bold tracking-[0px]">
          {user?.profile?.fullName
            ? user?.profile?.fullName.charAt(0).toUpperCase() + user?.profile?.fullName.slice(1)
            : ""}
        </h2>
        <p className="mb-0 text-center text-[13px]">{user?.preferences?.jobRole}</p>
      </div>
      <div className="flex w-full justify-around border-y border-black/10">
        <div className="w-1/2 border-r border-black/10 py-2.5 text-center">
          <p className="text-[16px] font-bold">{user?.connectionCount || 0}</p>
          <p className="text-sm">{t("connections")}</p>
        </div>
        <div className="w-1/2 py-2.5 text-center">
          <p className="text-[16px] font-bold">{user?.views || 0}</p>
          <p className="text-sm">{t("views")}</p>
        </div>
      </div>
      <button
        className="cursor-pointer rounded-full px-5 py-4 text-[13px] font-medium text-black"
        onClick={() => {
          router.push(`/single-user/${user._id}`);
        }}
      >
        {t("viewProfile")}
      </button>
    </Card>
  );
}

export default Profile;
