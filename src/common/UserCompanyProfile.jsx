"use client";
import React from "react";
import profileImg from "@/assets/feed/Profile.png";
import Card from "./card/Card";
import Image from "next/image";
import useAuthStore from "@/store/auth.store";
import getImg from "@/lib/getImg";

function UserCompanyProfile() {
  const { user } = useAuthStore();
  console.log(user,"sjkfksgdjf");
  

  return (
    <div className="w-full">
      <Card>
        <div className="p-6 flex flex-col items-center justify-center">
          <Image
            src={getImg(user?.coverBannerUrl) || profileImg}
            width={150}
            height={130}
            alt="McDonald's Logo"
            className="mb-[25px] rounded-md" 
          />
          <h2 className="text-xl leading-[1.3] tracking-[0px] font-bold mb-2">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-[13px]  mb-0">{user?.companyType} {user?.companyName}</p>
        </div>
        <div className="flex justify-around w-full  border-y border-black/10">
          <div className="w-1/2 text-center border-r border-black/10 py-2.5">
            <p className="font-bold text-[16px]">{user?.connectionCount}</p>
            <p className="text-sm">Connections</p>
          </div>
          <div className="w-1/2 text-center py-2.5">
            <p className="font-bold text-[16px]">{user?.views}</p>
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
