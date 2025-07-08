"use client";

import ImageFallback from "@/common/shared/ImageFallback";
import { Link, useRouter } from "@/i18n/navigation";
import getImg from "@/lib/getImg";
import useAuthStore from "@/store/auth.store";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FiBell, FiBriefcase, FiHome, FiMessageSquare, FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import MultiLanguageDropdown from "./MultiLanguageDropdown";

const UserNavItems = ({ onLinkClick }) => {
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
      {/* <div className="space-y-8 mt-10"> */}
      <Link
        href="/"
        className="mx-1 flex items-center space-x-2.5 border-b border-transparent pb-3 no-underline transition-all duration-300 ease-in-out hover:border-white md:pb-1"
        onClick={onLinkClick}
      >
        <FiHome className="h-5 w-5 text-white" />
        <span>{t("home")}</span>
      </Link>

      <Link
        href="/jobs"
        className="mx-1 flex items-center space-x-2.5 border-b border-transparent pb-3 no-underline transition-all duration-300 ease-in-out hover:border-white md:pb-1"
        onClick={onLinkClick}
      >
        <FiBriefcase className="h-5 w-5 text-white" />
        <span>{t("jobs")}</span>
      </Link>

      <Link
        href="/connections"
        className="mx-1 flex items-center space-x-2.5 border-b border-transparent pb-3 no-underline transition-all duration-300 ease-in-out hover:border-white md:pb-1"
        onClick={onLinkClick}
      >
        <FiUsers className="h-5 w-5 text-white" />
        <span>{t("connections")}</span>
      </Link>

      <Link
        href="/chat"
        className={`relative flex items-center space-x-1 pb-3 no-underline md:pb-0 ${
          isChatActive ? "rounded-full bg-white text-[#1D2F38]" : "text-white"
        }`}
        onClick={onLinkClick}
      >
        <div className={`rounded-full p-[5px] ${isChatActive ? "bg-white" : "bg-transparent"}`}>
          <FiMessageSquare
            className={`h-5 w-5 ${isChatActive ? "text-[#1D2F38]" : "text-white"}`}
          />
        </div>
        <span className="block text-white md:hidden">Messages</span>
        <span className="absolute start-1.5 top-0 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#DE4437] p-1 text-[10px] font-bold text-white">
          8
        </span>
      </Link>

      <Link
        href="/notifications"
        className={`relative flex items-center space-x-1.5 pb-3 no-underline md:pb-0 ${
          isNotificationsActive ? "rounded-full bg-white text-[#1D2F38]" : "text-white"
        }`}
        onClick={onLinkClick}
      >
        <div
          className={`rounded-full p-[5px] ${
            isNotificationsActive ? "bg-white" : "bg-transparent"
          }`}
        >
          <FiBell
            className={`h-5 w-5 ${isNotificationsActive ? "text-[#1D2F38]" : "text-white"}`}
          />
        </div>
        <span className="block text-white md:hidden">Notification</span>
        <span className="absolute start-1.5 top-0 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#00DFFC] p-1 text-[10px] font-bold text-white">
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
      <div className="relative px-1" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex no-underline focus:outline-none"
        >
          {user?.profile && (
            <ImageFallback
              src={user?.profile?.photo && getImg(user?.profile?.photo)}
              alt={"user"}
              width={30}
              height={30}
              className="h-[30px] w-[30px] rounded-full"
              priority={true}
            />
          )}
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 z-50 mt-2 w-40 rounded-md bg-white shadow-lg">
            <button
              className="block w-full px-4 py-2 text-left text-red-600"
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
      {/* </div> */}
    </>
  );
};

export default UserNavItems;
