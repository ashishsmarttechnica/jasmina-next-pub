"use client";

import { Link } from "@/i18n/navigation";
import useAuthStore from "@/store/auth.store";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { FiBell, FiBriefcase, FiHome, FiMessageSquare, FiUsers } from "react-icons/fi";
import capitalize from "../../lib/capitalize";

export default function MobileBottomNav() {
    const pathname = usePathname();
    const userType = capitalize(Cookies.get("userRole"));
    const { user } = useAuthStore();
    console.log(user, "userType+++++++++++++++++");
    // Hide navigation on auth pages and home pages
    const shouldHide = () => {
        if (!pathname) return false;

        // Hide on auth routes (login, signup, etc.)
        if (pathname.includes('/login') ||
            pathname.includes('/signup') ||
            pathname.includes('/forgot-password') ||
            pathname.includes('/verify-otp')) {
            return true;
        }

        // Hide on home pages (root path and localized root)
        if (pathname === '/' ||
            pathname.endsWith('/') ||
            pathname === '/en' ||
            pathname.endsWith('/en')) {
            return true;
        }

        return false;
    };

    const isActive = (route) => {
        try {
            if (!pathname) return false;
            // Works with locale-prefixed paths like /en/jobs
            return pathname === route || pathname.endsWith(route);
        } catch {
            return false;
        }
    };

    const baseItemClass =
        "flex flex-col items-center justify-center gap-0.5 text-[11px] no-underline";

    const iconClass = (active) => `h-5 w-5 ${active ? "text-white" : "text-[#D2D5D7]"}`;
    const textClass = (active) => `${active ? "text-white" : "text-[#D2D5D7]"}`;

    // Don't render if should hide
    if (shouldHide()) {
        return null;
    }

    return (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-black/10 bg-[#1D2F38]">
            <div className="container mx-auto">
                <ul className="flex items-center justify-between py-2">
                    <li>
                        <Link href="/" className={baseItemClass}>
                            <FiHome className={iconClass(isActive("/"))} />
                            <span className={textClass(isActive("/"))}>Home</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href={
                                userType === "Company" && user?._id
                                    ? `/connections?profileId=${user?._id}&type=Company&tab=company`
                                    : "/connections"
                            }
                            className={baseItemClass}
                        >
                            <FiUsers className={iconClass(isActive("/connections"))} />
                            <span className={textClass(isActive("/connections"))}>Network</span>
                        </Link>
                    </li>


                    {userType !== "Company" && (
                        <li>
                            <Link href="/jobs" className={`${baseItemClass}`}>
                                <FiBriefcase className={iconClass(isActive("/jobs"))} />
                                <span className={textClass(isActive("/jobs"))}>Jobs</span>
                            </Link>
                        </li>
                    )}

                    <li>
                        <Link href="/addnotifi" className={baseItemClass}>
                            <FiBell className={iconClass(isActive("/addnotifi"))} />
                            <span className={textClass(isActive("/addnotifi"))}>Alerts</span>
                        </Link>
                    </li>

                    <li>
                        <Link href="/chat" className={baseItemClass}>
                            <FiMessageSquare className={iconClass(isActive("/chat"))} />
                            <span className={textClass(isActive("/chat"))}>Messages</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}


