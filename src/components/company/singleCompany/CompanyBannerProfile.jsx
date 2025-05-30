import noImage2 from "@/assets/feed/no-img.png";
import logo from "@/assets/form/Logo.png";
import Flag from "@/assets/svg/user/Flag";
import ImageFallback from "@/common/shared/ImageFallback";
import UserBannerSkeleton from "@/common/skeleton/UserBannerSkeleton";
import getImg from "@/lib/getImg";
import EdicCompanyProfileModal from "@/modal/editCompanyProfile/EdicCompanyProfileModal";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useState } from "react";

const CompanyBannerProfile = ({ userData, isLoading }) => {
  const params = useParams();
  const paramsUserId = params?.id;
  const localUserId = Cookies.get("userId");
  const isCurrentUser = paramsUserId === localUserId;
  const [open, setOpen] = useState(false);
  if (isLoading) {
    return <UserBannerSkeleton />;
  }

  return (
    <div className="w-full overflow-hidden rounded-md xl:max-w-[829px]">
      <div className="flex h-40 items-center justify-between rounded-[5px] bg-[#CFE6CC]/[50%] px-4 py-6 sm:px-8 md:h-48 md:px-16 lg:h-56 lg:px-24">
        <div className="flex items-center gap-2">
          <ImageFallback
            src={logo}
            width={150}
            height={50}
            loading="lazy"
            alt="Logo"
            className="h-auto w-[150px] sm:w-[180px] md:w-[200px]"
          />
        </div>
      </div>

      <div className="relative bg-white px-4 py-6 md:px-8 md:py-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="flex w-full flex-col gap-0.5 px-2">
            <h2 className="text-lg font-bold text-black md:text-xl">
              {`${userData?.companyName || "Company Name"}`}
            </h2>
            <p className="text-[13px] font-normal md:text-[15px]">
              {userData?.tagline || "Company Tagline"}
            </p>
            <p className="text-xs font-normal text-[#888DA8]">
              {userData?.city || "City"}, {userData?.country || "Country"}
            </p>

            {isCurrentUser ? (
              <button className="profile-btn" onClick={() => setOpen(true)}>
                Edit Profile
              </button>
            ) : (
              <div className="mt-3.5 flex gap-2">
                <button className="connect-btn">Connect</button>
                <button className="message-btn">Message</button>
                <button className="flag-btn group">
                  <Flag className="stroke-grayBlueText group-hover:stroke-primary transition-all duration-200" />
                </button>
              </div>
            )}
          </div>
          <div className="flex w-full flex-col items-end justify-center">
            <div className="-mt-56 mr-0 h-28 w-28 overflow-hidden rounded-full md:-mt-24 md:mr-4 md:h-32 md:w-32">
              <ImageFallback
                src={userData?.logoUrl && getImg(userData.logoUrl)}
                loading="lazy"
                width={128}
                height={128}
                fallbackSrc={noImage2}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-28 flex w-full overflow-hidden border border-black/10 sm:mt-5 sm:max-w-xs md:mt-4 xl:max-w-[266px]">
              <div className="w-1/2 border-r border-black/10 px-2 py-4 text-center">
                <p className="text-primary text-[16px] font-bold">
                  {userData?.connectionCount || 0}
                </p>
                <p className="text-xs font-normal text-black">Connections</p>
              </div>

              <div className="w-1/2 px-2 py-4 text-center">
                <p className="text-primary text-[16px] font-bold">{userData?.views || 0}</p>
                <p className="text-xs font-normal text-black">Views</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EdicCompanyProfileModal open={open} onClose={() => setOpen(false)} userData={userData} />
    </div>
  );
};

export default CompanyBannerProfile;
