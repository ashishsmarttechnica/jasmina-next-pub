import React from "react";
import logo from "@/assets/form/Logo.png";
import Image from "next/image";
import userImg from "@/assets/feed/user-1.png";

const UserBannerProfile = () => {
  return (
    <div className=" xl:max-w-[829px] w-full  rounded-md overflow-hidden">
      <div className="bg-[#CFE6CC]/[50%] px-4 sm:px-8 md:px-16 lg:px-24 py-6 rounded-[5px] flex items-center justify-between h-40 md:h-48 lg:h-56">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            width={150}
            height={50}
            loading="lazy"
            alt="Logo"
            className="w-[150px] sm:w-[180px] md:w-[200px] h-auto"
          />
        </div>
      </div>

      <div className="bg-white px-4 py-6 md:px-8 md:py-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="px-2  w-full flex flex-col gap-0.5">
            <h2 className="text-lg md:text-xl font-bold text-black">
              Gurdeep Osahan
            </h2>
            <p className="text-[13px] md:text-[15px] font-normal ">
              UI / UX Designer
            </p>
            <p className="text-xs font-normal text-[#888DA8]">
              Lansing, Illinois
            </p>
            <button className="mt-3.5 px-4 text-[10px]  py-1 border w-fit  border-[#0F8200] text-[#0F8200] cursor-pointer rounded-[2px] hover:bg-green-100 md:text-sm">
              Edit Profile
            </button>
          </div>
          <div className="flex flex-col  items-end justify-center w-full">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden -mt-56 mr-0 md:mr-4 md:-mt-24  ">
              <Image
                src={userImg}
                loading="lazy"
                width={128}
                height={128}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex border border-black/10  mt-28 sm:mt-5 md:mt-4 w-full sm:max-w-xs xl:max-w-[266px] overflow-hidden">
              <div className="py-4 px-2 w-1/2 border-r border-black/10 text-center">
                <p className="text-[#0F8200] font-bold text-[16px]">358</p>
                <p className="text-black font-normal text-xs">Connections</p>
              </div>

              <div className="py-4 px-2 w-1/2 text-center">
                <p className="text-[#0F8200] font-bold text-[16px]">85</p>
                <p className="text-black font-normal text-xs">Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBannerProfile;
