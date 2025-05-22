"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Cookies from "js-cookie";
import HeaderLogoLink from "./HeaderLogoLink";
import CompanyNavItems from "./CompanyNavItems";
import capitalize from "@/lib/capitalize";
import UserNavItems from "./UserNavItems";
import { useTranslations } from "next-intl";

export default function UserHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
   const userType = capitalize(Cookies.get("userRole"));
   const t=useTranslations("UserHeader");
 
   const logoHref = "/";

  return (

    <div className="sticky top-0 z-50">
      <div className="bg-[#1D2F38] py-2.5 md:px-4 relative">
        <header className="container mx-auto flex items-center justify-between">
          {/* Logo & Search */}
          <div className="flex items-center gap-3 w-full max-w-md">
            <HeaderLogoLink logoHref={logoHref} />
            <div className="relative text-white max-w-[242px] w-full">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full bg-[#132028] text-[13px] font-normal pl-3 py-1.5 rounded focus:outline-none placeholder:text-white"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden text-[#D2D5D7] md:flex items-center gap-3 text-sm">
            {userType === "User" ? <UserNavItems /> : <CompanyNavItems />}
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden text-white ml-4"
            onClick={() => setMenuOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </header>

        {/* Mobile Sidebar Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 h-full w-64 bg-[#1D2F38] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)}>
              <FiX className="text-white w-6 h-6" />
            </button>
          </div>
          <div className="text-white px-6 space-y-6 text-sm">
            {userType === "User" ? <UserNavItems /> : <CompanyNavItems />}
            {/* <CompanyNavItems /> */}
          </div>
        </div>

        {/* Overlay when mobile menu is open */}
        {menuOpen && (
          <div
            className="md:hidden fixed inset-0  z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
}
