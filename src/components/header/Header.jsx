"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import HeaderLogo from "@/assets/header/HeaderLogo.png";
import MultiLanguageDropdown from "./MultiLanguageDropdown";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import HeaderLogoLink from "./HeaderLogoLink";
import useAuthStore from "@/store/auth.store";
import { toast } from "react-toastify";

const Header = ({ isLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const logoHref = "/";

  // ✅ Disable background scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <>
      <header className="w-full bg-headerbg py-[7px]">
        <div className="container mx-auto px-2 md:px-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <HeaderLogoLink logoHref={logoHref} />
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <IoClose /> : <GiHamburgerMenu />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex md:items-center md:gap-6 text-white">
              <MultiLanguageDropdown />
              {isLogin ? (
                <ul className="flex gap-2">
                  <li>
                    <button
                      className="btn-small"
                      onClick={() => {
                        logout()
                        router.push("/login")
                        toast.success(t("logoutSuccess"))
                      }}
                    >
                      {t("logout")}
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="flex gap-2">
                  <li>
                    <Link href="/login" className="btn-small-light">
                      {t("login")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup" className="btn-small">
                      {t("SignUp")}
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>

        {/* ✅ Mobile Side Drawer WITHOUT backdrop, but no scroll in bg */}
        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-headerbg text-white z-50 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setIsOpen(false)} aria-label="Close Menu">
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="flex flex-col gap-4 px-6 py-5">
            <MultiLanguageDropdown />
            {isLogin ? (
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href="/login"
                    className="btn-small-light"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("logout")}
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="/login"
                    className="btn-small-light"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("login")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-small"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("SignUp")}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
