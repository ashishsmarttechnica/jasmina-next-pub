"use client";
import React from "react";
import Card from "./card/Card";
import useAuthStore from "@/store/auth.store";
import getImg from "@/lib/getImg";
import { useTranslations } from "next-intl";
import ImageFallback from "./shared/ImageFallback";
import noImage2 from "@/assets/feed/no-img.png";
function Profile() {
  const { user } = useAuthStore();
  const t = useTranslations("FeedProfileLeft");

  return (
    <div className="w-full">
      <Card>
        <div className="p-6 flex flex-col items-center justify-center">
          <ImageFallback
            src={user?.profile?.photo && getImg(user?.profile?.photo)}
            fallbackSrc={noImage2}
            width={130}
            height={130}
            alt={user?.profile?.fullName ?? "user"}
            className="mb-[25px] rounded-full"
          />
          <h2 className="text-xl leading-[1.3] tracking-[0px] font-bold mb-2">
            {user?.profile?.fullName}
          </h2>
          <p className="text-[13px]  mb-0">{user?.preferences?.jobRole}</p>
        </div>
        <div className="flex justify-around w-full  border-y border-black/10">
          <div className="w-1/2 text-center border-r border-black/10 py-2.5">
            <p className="font-bold text-[16px]">
              {user?.connectionCount || 0}
            </p>
            <p className="text-sm">{t("connections")}</p>
          </div>
          <div className="w-1/2 text-center py-2.5">
            <p className="font-bold text-[16px]">{user?.views || 0}</p>
            <p className="text-sm">{t("views")}</p>
          </div>
        </div>
        <button className="text-black cursor-pointer font-medium text-[13px] px-5 py-4 rounded-full">
          {t("viewProfile")}
        </button>
      </Card>
    </div>
  );
}

export default Profile;
