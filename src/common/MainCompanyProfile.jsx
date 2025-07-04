"use client";
import noImage2 from "@/assets/feed/no-img.png";
import { usePathname, useRouter } from "@/i18n/navigation"; // <-- Add usePathname
import useAuthStore from "@/store/auth.store";
import { BiLogOut } from "react-icons/bi";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdSettings, MdWork } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import getImg from "../lib/getImg";
import Card from "./card/Card";
import ImageFallback from "./shared/ImageFallback";
import { useTranslations } from "next-intl";

const MainCompanyProfile = ({ title, userData }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname(); // <-- Get current route
  const logout = useAuthStore((state) => state.logout);
  const t = useTranslations("CompanyProfile");
  const userId = user?._id;

  const handleMenuClick = (item) => {
    if (item.isLogout) {
      logout();
      router.push("/login");
      toast.success("Logged out successfully");
    } else if (pathname !== item.path) {
      router.push(item.path);
    }
  };

  const menuItems = [
    {
      icon: (isActive) => (
        <FiUser className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('Profile'),
      path: `/company/single-company/${userId}`,
      count: null,
    },
    {
      icon: (isActive) => (
        <MdWork className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('PostaJob'),
      path: `/company/single-company/${userId}/postjob`,
      count: 3,
    },
    {
      icon: (isActive) => (
        <BsFileEarmarkText className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('Interview'),
      path: `/company/single-company/${userId}/applications`,
      count: 45,
    },
    {
      icon: (isActive) => (
        <RiHandCoinLine className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('ViewApplications'),
      path: `/company/single-company/${userId}/interview`,
      count: null,
    },
    {
      icon: (isActive) => (
        <MdSettings className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('Settings'),
      path: `/company/single-company/${userId}/settings`,
      count: null,
    },
    {
      icon: (isActive) => (
        <RiHandCoinLine className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('Subscription'),
      path: `/company/single-company/${userId}/subscription`,
      count: null,
    },
    {
      icon: (isActive) => (
        <BiLogOut className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: t('Logout'),
      isLogout: true,
      path: "/logout",
      count: null,
    },
  ];

  return (
    <Card className="md:w-full md:max-w-full xl:max-w-[266px]">
      <div className="flex w-full flex-col">
        {/* Company Logo and Name */}
        <div className="border-b border-slate-100 px-5 py-3">
          <div className="flex items-center gap-3">
            <ImageFallback
              src={userData?.logoUrl && getImg(userData.logoUrl)}
              loading="lazy"
              width={128}
              height={128}
              fallbackSrc={noImage2}
              alt="Profile"
              className="h-8 w-8 rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/default-company-logo.png";
              }}
            />
            <span className="text-lg font-semibold">{title}</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex w-full flex-col">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={index}
                className="flex w-full items-center justify-between border-t border-slate-100 px-6 py-3 transition-colors hover:bg-gray-100"
                onClick={() => handleMenuClick(item)}
              >
                <div className="flex items-center gap-3">
                  {typeof item.icon === "function" ? item.icon(isActive) : item.icon}
                  <span
                    className={`text-[13px] ${isActive ? "text-black" : "text-gray-600"}`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.count !== null && (
                  <span
                    className={`text-[12px] font-bold ${isActive ? "text-black" : "text-gray-700"}`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default MainCompanyProfile;
