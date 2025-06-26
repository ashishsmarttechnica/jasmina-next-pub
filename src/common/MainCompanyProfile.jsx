"use client";
import noImage2 from "@/assets/feed/no-img.png";
// import Subscription from "@/components/subscription/Subscription";
import { useRouter } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";
import useConnectionsStore from "@/store/connections.store";
import Cookies from "js-cookie";
import { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { BsFileEarmarkText } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdSettings, MdWork } from "react-icons/md";
import { RiHandCoinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import getImg from "../lib/getImg";
import Card from "./card/Card";
import ImageFallback from "./shared/ImageFallback";
import Subscription from "../components/subscription/Subscription";

const MainCompanyProfile = ({ title, userData, onContentChange }) => {
  const { connections } = useConnectionsStore();
  const userType = Cookies.get("userRole");
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [activeItem, setActiveItem] = useState(null);

  const handleLogout = () => {
    logout();
    router.push("/login");
    toast.success("Logged out successfully");
  };

  const handleMenuClick = (label) => {
    if (label === "Logout") {
      handleLogout();
    } else {
      setActiveItem(label);
      if (label === "Subscription") {
        onContentChange && onContentChange(<Subscription />);
      }
    }
  };

  const menuItems = [
    {
      icon: (isActive) => (
        <FiUser className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "Profile",
      count: null,
    },
    {
      icon: (isActive) => (
        <MdWork className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "Post a Job",
      count: 3,
    },
    {
      icon: (isActive) => (
        <BsFileEarmarkText className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "View Applications",
      count: 45,
    },
    {
      icon: (isActive) => (
        <RiHandCoinLine className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "Interviews",
      count: null,
    },
    {
      icon: (isActive) => (
        <MdSettings className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "Settings",
      count: null,
    },
    {
      icon: (isActive) => (
        <RiHandCoinLine className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "Subscription",
      count: null,
    },
    {
      icon: (isActive) => (
        <BiLogOut className={`text-xl ${isActive ? "text-black" : "text-gray-500"}`} />
      ),
      label: "Logout",
      count: null,
    },
  ];

  return (
    <Card className="md:w-full md:max-w-full xl:max-w-[300px]">
      <div className="flex w-full flex-col">
        {/* Company Logo and Name */}
        <div className="border-b p-4">
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
                e.target.src = "/default-company-logo.png";
              }}
            />
            <span className="text-lg font-semibold">{title}</span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex w-full flex-col">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="flex w-full items-center justify-between border-t border-slate-100 px-6 py-3 transition-colors hover:bg-gray-100"
              onClick={() => handleMenuClick(item.label)}
            >
              <div className="flex items-center gap-3">
                {typeof item.icon === "function" ? item.icon(activeItem === item.label) : item.icon}
                <span className={`${activeItem === item.label ? "text-black" : "text-gray-600"}`}>
                  {item.label}
                </span>
              </div>
              {item.count !== null && (
                <span
                  className={`font-medium ${activeItem === item.label ? "text-black" : "text-gray-700"}`}
                >
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MainCompanyProfile;
