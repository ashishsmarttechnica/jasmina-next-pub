"use client";

import capitalize from "@/lib/capitalize";
import Cookies from "js-cookie";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import CompanyNavItems from "./CompanyNavItems";
import HeaderLogoLink from "./HeaderLogoLink";
import SearchBar from "./SearchBar";
import UserNavItems from "./UserNavItems";

export default function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState("User"); // Default to User
  const t = useTranslations("UserHeader");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    const userRole = Cookies.get("userRole");
    if (userRole) {
      setUserType(capitalize(userRole));
    }
  }, []);

  const logoHref = "/";

  return (
    <div className="sticky top-0 z-50">
      <div className="relative bg-[#1D2F38] py-2.5 md:px-4">
        <header className="container mx-auto flex items-center justify-between">
          {/* Logo & Search */}
          <div className="flex w-full max-w-sm items-center gap-3">
            <HeaderLogoLink logoHref={logoHref} />
            <div className="w-full max-w-[242px]">
              <SearchBar placeholder={t("searchPlaceholder")} />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-3 text-sm text-[#D2D5D7] md:flex">
            {userType === "User" ? (
              <UserNavItems onLinkClick={() => {}} />
            ) : (
              <CompanyNavItems onLinkClick={() => {}} />
            )}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button className="ms-4 text-white md:hidden" onClick={() => setMenuOpen(true)}>
            <FiMenu className="h-6 w-6" />
          </button>
        </header>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 z-50 h-full w-64 transform bg-[#1D2F38] shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
            isRTL ? "left-0" : "right-0"
          } ${
            menuOpen
              ? isRTL
                ? "translate-x-0"
                : "translate-x-0"
              : isRTL
                ? "-translate-x-full"
                : "translate-x-full"
          }`}
        >
          <div className={`flex ${isRTL ? "justify-start" : "justify-end"} p-4`}>
            <button onClick={() => setMenuOpen(false)}>
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className={`space-y-6 px-4 text-sm text-white`}>
            {userType === "User" ? (
              <UserNavItems onLinkClick={() => setMenuOpen(false)} />
            ) : (
              <CompanyNavItems onLinkClick={() => setMenuOpen(false)} />
            )}
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {menuOpen && (
          <div
            className="bg-opacity-50 fixed inset-0 z-40 bg-black/50 transition-all duration-300 ease-in-out md:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
