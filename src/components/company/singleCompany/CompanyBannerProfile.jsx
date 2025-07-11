import noImage2 from "@/assets/feed/no-img.png";
import logo from "@/assets/form/Logo.png";
import Flag from "@/assets/svg/user/Flag";
import ImageFallback from "@/common/shared/ImageFallback";
import UserBannerSkeleton from "@/common/skeleton/UserBannerSkeleton";
import { useRemoveConnection } from "@/hooks/connections/useConnections";
import getImg from "@/lib/getImg";
import EdicCompanyProfileModal from "@/modal/editCompanyProfile/EdicCompanyProfileModal";
import PasswordResetModal from "@/modal/passwordReset/PasswordResetModal";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
// import { useParams } from "next/navigation";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import ReportModel from "@/modal/ReportModel";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAcceptConnection } from "../../../hooks/user/useNetworkInvites";

const CompanyBannerProfile = ({ userData, isLoading }) => {
  const t = useTranslations("CompanyProfile.singleCompany");
  const params = useParams();
  const paramsUserId = params?.id;
  console.log(userData, "paramsUserId");

  const localUserId = Cookies.get("userId");
  const isCurrentUser = paramsUserId === localUserId;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: acceptConnection, isPending } = useAcceptConnection();
  // Check if user came from connections page
  // const fromConnections =
  //   searchParams?.get("fromConnections") === "true" || userData?.isConnected === true;
  const [showConnect, setShowConnect] = useState(
    !(searchParams?.get("fromConnections") === "true" || userData?.isConnected === true)
  );
  const { mutate: removeConnection } = useRemoveConnection();

  const handleConnectionClick = () => {
    router.push("/en/connections");
  };
  const handleResentPassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleRemoveConnection = () => {
    if (!userData || !paramsUserId) return;

    setIsRemoving(true);

    removeConnection(
      {
        id: paramsUserId,
        role: "Company",
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            // Refresh the page to update the UI
            setShowConnect(true);
          } else {
            toast.error(res?.message || t("Failedtoremoveconnection"));
          }
        },
        onError: (error) => {
          toast.error(error?.message || t("Failedtoremoveconnection"));
        },
        onSettled: () => {
          setIsRemoving(false);
        },
      }
    );
  };

  const handleConnect = () => {
    if (!userData || !paramsUserId) return;
    acceptConnection(
      { id: paramsUserId, role: "Company" },
      {
        onSuccess: (res) => {
          if (res.success) {
            setShowConnect(false);
          } else {
            toast.error(res?.message || t("Failedtoacceptconnection"));
          }
        },
        onError: (error) => {
          toast.error(error?.message || t("Failedtoacceptconnection"));
        },
      }
    );
  };
  if (isLoading) {
    return <UserBannerSkeleton />;
  }
  return (
    <div className="w-full overflow-hidden rounded-md xl:max-w-[829px]">
      <div
        className={`flex items-center justify-between rounded-[5px] ${userData.coverBannerUrl ? "" : "bg-[#CFE6CC]/[50%] px-4 py-6 sm:px-8 md:px-16 lg:px-24"} h-40 md:h-48 lg:h-56`}
      >
        {userData?.coverBannerUrl ? (
          <ImageFallback
            fallbackSrc={logo}
            width={1080}
            height={720}
            src={userData?.coverBannerUrl && getImg(userData.coverBannerUrl)}
            alt="Company Banner"
            className="h-auto w-full object-contain object-top"
            loading="lazy"
          />
        ) : (
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
        )}
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
            <p className="text-xs font-normal text-[#888DA8]">{userData?.country || "Country"}</p>

            {/* {isCurrentUser ? (
              <div className="flex gap-2">
                <button className="profile-btn" onClick={() => setOpen(true)}>
                  {t("editProfile")}
                </button>
                <button className="profile-btn" onClick={() => handleResentPassword()}>
                  Reset Password
                </button>
              </div>
            ) : (
              <div className="mt-3.5 flex gap-2">
                {fromConnections ? (
                  <button
                    onClick={handleRemoveConnection}
                    disabled={isRemoving}
                    className="text-primary border-primary border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRemoving ? "Removing..." : "Remove"}
                  </button>
                ) : (
                  <button className="connect-btn">{t("connect")}</button>
                )}
                <button className="message-btn">{t("message")}</button>
                <button className="flag-btn group" onClick={() => setIsModalOpen(true)}>
                  <Flag className="stroke-grayBlueText group-hover:stroke-primary transition-all duration-200" />
                </button>
                <ReportModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
              </div>
            )} */}
            {isCurrentUser ? (
              <div className="flex gap-2">
                <button className="profile-btn" onClick={() => setOpen(true)}>
                  {t("editProfile")}
                </button>
                <button className="profile-btn" onClick={() => handleResentPassword()}>
                  {t("resetPassword")}
                </button>
              </div>
            ) : (
              <div className="mt-3.5 flex gap-2">
                {showConnect ? (
                  <button className="connect-btn" onClick={handleConnect}>
                    {t("connect")}
                  </button>
                ) : (
                  <button
                    onClick={handleRemoveConnection}
                    disabled={isRemoving}
                    className="text-primary border-primary border px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isRemoving ? "Removing..." : "Remove"}
                  </button>
                )}
                <button className="message-btn">{t("message")}</button>
                <button className="flag-btn group" onClick={() => setIsModalOpen(true)}>
                  <Flag className="stroke-grayBlueText group-hover:stroke-primary transition-all duration-200" />
                </button>
                <ReportModel isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
              <div
                onClick={handleConnectionClick}
                className="w-1/2 cursor-pointer border-r border-black/10 px-2 py-4 text-center hover:bg-gray-50"
              >
                <p className="text-primary text-[16px] font-bold">
                  {userData?.connectionCount || 0}
                </p>
                <p className="text-xs font-normal text-black">{t("connections")}</p>
              </div>

              <div className="w-1/2 px-2 py-4 text-center">
                <p className="text-primary text-[16px] font-bold">{userData?.views || 0}</p>
                <p className="text-xs font-normal text-black">{t("views")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EdicCompanyProfileModal open={open} onClose={() => setOpen(false)} userData={userData} />
      <PasswordResetModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userData={userData}
      />
    </div>
  );
};

export default CompanyBannerProfile;
