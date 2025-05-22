"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import HeaderLogo from "@/assets/header/HeaderLogo.png";
import {
  FiHome,
  FiBriefcase,
  FiBell,
  FiMessageSquare,
  FiUsers,
} from "react-icons/fi";
import { Link, useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "@/store/auth.store";
import { toast } from "react-toastify";
import getImg from "@/lib/getImg";
import MultiLanguageDropdown from "./MultiLanguageDropdown";
import { useTranslations } from "next-intl";
import ImageFallback from "@/common/shared/ImageFallback";

const UserNavItems = () => {
  const pathname = usePathname();
  const t = useTranslations("UserHeader");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isNotificationsActive = pathname === "/notifications";
  const isChatActive = pathname === "/Chat";
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { user } = useAuthStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <MultiLanguageDropdown />
      <Link
        href="/"
        className="flex items-center space-x-2.5 mx-1 no-underline border-b border-transparent hover:border-white pb-1 transition-all duration-300 ease-in-out"
      >
        <FiHome className="h-4 w-4 text-white" />
        <span>{t("home")}</span>
      </Link>

      <Link
        href="/jobs"
        className="flex items-center space-x-2.5 mx-1 no-underline border-b border-transparent hover:border-white pb-1 transition-all duration-300 ease-in-out"
      >
        <FiBriefcase className="h-4 w-4 text-white" />
        <span>{t("jobs")}</span>
      </Link>

      <Link
        href="/connections"
        className="flex items-center space-x-2.5 mx-1 no-underline border-b border-transparent hover:border-white pb-1 transition-all duration-300 ease-in-out"
      >
        <FiUsers className="h-4 w-4 text-white" />
        <span>{t("connections")}</span>
      </Link>

      <Link
        href="/Chat"
        className={`flex items-center space-x-1 relative no-underline ${
          isChatActive ? "bg-white text-[#1D2F38] rounded-full" : "text-white"
        }`}
      >
        <div
          className={`p-[7px] rounded-full ${
            isChatActive ? "bg-white" : "bg-transparent"
          }`}
        >
          <FiMessageSquare
            className={`h-4 w-4 ${
              isChatActive ? "text-[#1D2F38]" : "text-white"
            }`}
          />
        </div>
        {/* <span className="block md:hidden text-[#1D2F38]">Messages</span> */}
        <span className="absolute top-1 right-1.5 bg-[#DE4437] text-white text-[9px] font-bold w-2.5 h-2.5 flex items-center justify-center rounded-full">
          8
        </span>
      </Link>

      <Link
        href="/notifications"
        className={`flex items-center space-x-1.5 relative no-underline ${
          isNotificationsActive
            ? "bg-white text-[#1D2F38] rounded-full"
            : "text-white"
        }`}
      >
        <div
          className={`p-[7px] rounded-full ${
            isNotificationsActive ? "bg-white" : "bg-transparent"
          }`}
        >
          <FiBell
            className={`h-4 w-4 ${
              isNotificationsActive ? "text-[#1D2F38]" : "text-white"
            }`}
          />
        </div>
        {/* <span className="block md:hidden text-[#1D2F38]">Notification</span> */}
        <span className="absolute top-1 right-1.5 bg-[#00DFFC] text-white text-[9px] font-bold w-2.5 h-2.5 flex items-center justify-center rounded-full">
          6
        </span>
      </Link>

      {/* <Link href="/your-profile" className="no-underline">
        <Image
          src={HeaderLogo}
          alt="User"
          width={30}
          height={30}
          className="rounded-full border border-white"
        />
      </Link> */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="no-underline focus:outline-none"
        >
          <ImageFallback
            src={user?.profile?.photo && getImg(user?.profile?.photo)}
            alt={"user"}
            width={30}
            height={30}
            className="rounded-full "
          />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 text-red-600"
              onClick={() => {
                logout();
                router.push("/login");
                toast.success("Logout successful!");
              }}
            >
              {t("logout")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserNavItems;
