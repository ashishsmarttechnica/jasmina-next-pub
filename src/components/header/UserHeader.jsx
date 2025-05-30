"use client";

import capitalize from "@/lib/capitalize";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import CompanyNavItems from "./CompanyNavItems";
import HeaderLogoLink from "./HeaderLogoLink";
import UserNavItems from "./UserNavItems";

export default function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userType, setUserType] = useState("User"); // Default to User
  const t = useTranslations("UserHeader");

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
            <div className="relative w-full max-w-[242px] text-white">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full rounded bg-[#132028] py-1.5 pl-3 text-[13px] font-normal placeholder:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-3 text-sm text-[#D2D5D7] md:flex">
            {userType === "User" ? <UserNavItems /> : <CompanyNavItems />}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button className="ml-4 text-white md:hidden" onClick={() => setMenuOpen(true)}>
            <FiMenu className="h-6 w-6" />
          </button>
        </header>

        {/* Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-[#1D2F38] shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)}>
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="space-y-6 px-6 text-sm text-white">
            {userType === "User" ? <UserNavItems /> : <CompanyNavItems />}
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}></div>
        )}
      </div>
    </div>
  );
}
