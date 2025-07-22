import logo from "@/assets/form/Logo.png";
import Flag from "@/assets/svg/user/Flag";
import ImageFallback from "@/common/shared/ImageFallback";
import UserBannerSkeleton from "@/common/skeleton/UserBannerSkeleton";
import { useCreateConnection, useRemoveConnection } from "@/hooks/connections/useConnections";
import getImg from "@/lib/getImg";
import EditProfileModal from "@/modal/editProfile/EditProfileModal";
import PasswordResetModal from "@/modal/passwordReset/PasswordResetModal";
import ReportModel from "@/modal/ReportModel";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

// Import social media icons
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
  </svg>
);

const availabilityIcons = {
  "Open to Work": "🟢",
  "Available for Freelance": "🟡",
  "Not Available": "🔴",
  " Open for Remote Worldwide": "🌍",
};

const UserBannerProfile = ({
  userData,
  isLoading,
  handleDisc,
  opens,
  descriptionData,
  handleCloses,
}) => {
  const t = useTranslations("CompanyProfile.singleCompany");
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramsUserId = params?.id;
  const localUserId = Cookies.get("userId");
  const isCurrentUser = paramsUserId === localUserId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showConnect, setShowConnect] = useState(
    !(searchParams?.get("fromConnections") === "true" || userData?.isConnected === true)
  );

  // const { mutate: acceptConnection, isPending } = useAcceptConnection();
  const {
    mutate: createConnection,
    isPending,
    isLoading: isCreateConnectionLoading,
  } = useCreateConnection();
  // Check if user came from connections page
  const fromConnections =
    searchParams?.get("fromConnections") === "true" || userData?.isConnected === true;

  const { mutate: removeConnection } = useRemoveConnection();

  const handleResentPassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleConnectionClick = () => {
    if (userData?._id) {
      router.push(`/en/connections?profileId=${userData._id}&type=User&tab=people`);
    } else {
      router.push("/en/connections");
    }
  };

  const handleRemoveConnection = () => {
    if (!userData || !paramsUserId) return;

    setIsRemoving(true);

    removeConnection(
      {
        id: paramsUserId,
        role: "User",
      },
      {
        onSuccess: (res) => {
          if (res.success) {
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

  // const handleConnect = () => {
  //   if (!userData || !paramsUserId) return;
  //   acceptConnection(
  //     { id: paramsUserId, role: "User" },
  //     {
  //       onSuccess: (res) => {
  //         if (res.success) {
  //           setShowConnect(false);
  //         } else {
  //           toast.error(res?.message || t("Failedtoconnect"));
  //         }
  //       },
  //       onError: (error) => {
  //         toast.error(error?.message || t("Failedtoconnect"));
  //       },
  //     }
  //   );
  // };

  const handleContactClick = (item) => {
    if (isCreateConnectionLoading) return;
    createConnection(
      { id: item._id, role: item.role },
      {
        onSuccess: (res) => {
          if (res.success) {
            setShowConnect(false);
          } else {
            toast.error(res?.message || t("Failedtoconnect"));
          }
        },
      }
    );
  };
  if (isLoading) {
    return <UserBannerSkeleton />;
  }
  console.log(userData.profile.availabilty, "userData.profile.availabilty");
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
              {userData?.profile?.fullName || t("fullName")}
            </h2>
            <p className="text-[13px] font-normal md:text-[15px]">
              {userData?.preferences?.jobRole || t("jobRole")}
            </p>
            <p className="text-xs font-normal text-[#888DA8]">
              {userData?.profile?.location || t("location")}
            </p>
            <div className="flex gap-2">
              <div className="mt-1 flex items-center gap-1 text-xs font-normal text-[#888DA8]">
                <div className="font-bold"> Availability : </div>
                <div>
                  {userData?.profile?.availabilty ? (
                    <>
                      <span>{availabilityIcons[userData.profile.availabilty] || ""}</span>{" "}
                      {userData.profile.availabilty}
                    </>
                  ) : (
                    t("Availability")
                  )}
                </div>
              </div>
            </div>

            {/* Social Media Links with Icons */}
            <div className="mt-3 flex items-center gap-5">
              {userData?.profile?.linkedin && (
                <a
                  href={userData.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-[#E8F1FA] px-3 py-1.5 text-xs font-medium text-[#0A66C2] transition-all duration-200 hover:bg-[#D8E8F7] hover:text-[#004182]"
                >
                  <LinkedInIcon />
                  {/* <span>LinkedIn</span> */}
                </a>
              )}
              {userData?.profile?.instagram && (
                <a
                  href={userData.profile.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-[#FDEEF2] px-3 py-1.5 text-xs font-medium text-[#E4405F] transition-all duration-200 hover:bg-[#FCE4EB] hover:text-[#C13584]"
                >
                  <InstagramIcon />
                  {/* <span>Instagram</span> */}
                </a>
              )}
              {userData?.profile?.x && (
                <a
                  href={userData.profile.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-[#E8F5FD] px-3 py-1.5 text-xs font-medium text-[#1DA1F2] transition-all duration-200 hover:bg-[#D8EEFB] hover:text-[#0C85D0]"
                >
                  <XIcon />
                  {/* <span>X</span> */}
                </a>
              )}
              {userData?.profile?.facebook && (
                <a
                  href={userData.profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-md bg-[#E7F0FD] px-3 py-1.5 text-xs font-medium text-[#1877F2] transition-all duration-200 hover:bg-[#D7E6FB] hover:text-[#0D65D9]"
                >
                  <FacebookIcon />
                  {/* <span>Facebook</span> */}
                </a>
              )}
            </div>

            {isCurrentUser ? (
              <div className="flex gap-2">
                <button className="profile-btn" onClick={() => handleDisc(userData)}>
                  {t("editProfile")}
                </button>
                <button className="profile-btn" onClick={() => handleResentPassword(userData)}>
                  {t("resetPassword")}
                </button>
              </div>
            ) : (
              <div className="mt-3.5 flex gap-2">
                {showConnect ? (
                  <button className="connect-btn" onClick={() => handleContactClick(userData)}>
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
                src={userData?.profile?.photo && getImg(userData?.profile?.photo)}
                loading="lazy"
                width={128}
                height={128}
                // fallbackSrc={noImage2}
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
      <EditProfileModal open={opens} onClose={handleCloses} descriptionData={descriptionData} />
      <PasswordResetModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userData={userData}
      />
    </div>
  );
};

export default UserBannerProfile;
