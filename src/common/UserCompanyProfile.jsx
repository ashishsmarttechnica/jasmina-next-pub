"use client";
import React from "react";
import profileImg from "@/assets/feed/Profile.png";
import Card from "./card/Card";
import Image from "next/image";
import useAuthStore from "@/store/auth.store";

function UserCompanyProfile() {
  const data = useAuthStore();

  return (
    <div className="w-full">
      <Card>
        <div className="p-6 flex flex-col items-center justify-center">
          <Image
            src={data?.user?.profile?.photo || profileImg}
            width={130}
            height={130}
            alt="McDonald's Logo"
            className="mb-[25px]"
          />
          <h2 className="text-xl leading-[1.3] tracking-[0px] font-bold mb-2">
            McDonald's
          </h2>
          <p className="text-[13px]  mb-0">Restaurants · Chicago, Illinois</p>
        </div>
        <div className="flex justify-around w-full  border-y border-black/10">
          <div className="w-1/2 text-center border-r border-black/10 py-2.5">
            <p className="font-bold text-[16px]">358</p>
            <p className="text-sm">Connectsdsdsions</p>
          </div>
          <div className="w-1/2 text-center py-2.5">
            <p className="font-bold text-[16px]">85</p>
            <p className="text-sm">Views</p>
          </div>
        </div>
        <button className="text-black cursor-pointer font-medium text-[13px] px-5 py-4 rounded-full">
          View my profile
        </button>
      </Card>
    </div>
  );
}

export default UserCompanyProfile;
