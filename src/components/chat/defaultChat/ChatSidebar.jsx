"use client";
import { useCompanyConnections, useConnections } from "@/hooks/connections/useConnections";
import capitalize from "@/lib/capitalize";
import getImg from "@/lib/getImg";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ImageFallback from "../../../common/shared/ImageFallback";
import Search from "./Search";

export default function ChatSidebar({ onSelect, activeChat }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");
  const [userPage, setUserPage] = useState(1);
  const [companyPage, setCompanyPage] = useState(1);

  // Get userId from URL, userType from login (cookie)
  const searchParams = useSearchParams();
  const userId = searchParams.get("profileId");
  const userType = capitalize(Cookies.get("userRole"));

  // Fetch user and company connections with correct userId/userType
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
    refetch: refetchUser,
  } = useConnections("User", userPage, undefined, { userId, userType });

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
    refetch: refetchCompany,
  } = useCompanyConnections("Company", companyPage, undefined, { userId, userType });

  // Refetch data and reset page on tab switch
  useEffect(() => {
    if (activeTab === "people") {
      setUserPage(1);
      refetchUser();
    } else {
      setCompanyPage(1);
      refetchCompany();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Select data based on active tab
  const chats =
    activeTab === "people" ? userData?.connections || [] : companyData?.connections || [];
  const isLoading = activeTab === "people" ? isUserLoading : isCompanyLoading;
  const isError = activeTab === "people" ? isUserError : isCompanyError;
  const error = activeTab === "people" ? userError : companyError;
  const refetch = activeTab === "people" ? refetchUser : refetchCompany;

  const filteredChats = chats.filter((chat) =>
    (chat.name || chat.fullName || chat.companyName || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  console.log("filteredChats:", filteredChats); // Log the filteredChats array
  return (
    <div className="w-full bg-white md:border-r md:border-[#000000]/10 xl:w-[275.5px]">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeTab === "people" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("people")}
        >
          People
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium ${activeTab === "company" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500"}`}
          onClick={() => setActiveTab("company")}
        >
          Company
        </button>
      </div>
      {/* Search */}
      <div className="sticky top-0 z-10 bg-white p-3.5 pb-[20px] md:border-b md:border-[#000000]/10">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${activeTab === "people" ? "people" : "companies"}`}
        />
      </div>
      {/* Content */}
      {isLoading ? (
        <div className="p-4 text-center text-gray-400">Loading...</div>
      ) : isError ? (
        <div className="p-4 text-center text-red-500">
          Error: {error?.message || "Failed to load."}
          <button className="mt-2 block text-blue-500 underline" onClick={refetch}>
            Retry
          </button>
        </div>
      ) : filteredChats.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No {activeTab === "people" ? "people" : "companies"} found.
        </div>
      ) : (
        filteredChats.map((chat) => (
          <div
            key={chat._id || chat.id}
            onClick={() => onSelect(chat)}
            className={`flex cursor-pointer items-center gap-3 border-b border-slate-200 p-3 py-4 hover:bg-gray-100 ${
              activeChat?.id === chat.id || activeChat?._id === chat._id ? "bg-gray-100" : ""
            }`}
          >
            {activeTab === "company" ? (
              <>
                <ImageFallback
                  src={chat.details?.logoUrl ? getImg(chat.details.logoUrl) : "/default-avatar.png"}
                  alt="company logo"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">
                    {chat.details?.companyName || "No Company Name"}
                  </div>
                  <div className="text-xs text-gray-500">
                    {chat.details?.industryType?.join(", ") || "No Industry"}
                  </div>
                </div>
              </>
            ) : (
              <>
                <ImageFallback
                  src={
                    chat.details?.profile?.photo
                      ? getImg(chat.details.profile.photo)
                      : "/default-avatar.png"
                  }
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{chat.details?.profile?.fullName || "No Name"}</div>
                  <div className="text-xs text-gray-500">
                    {chat.details?.profile?.userName || "No Username"}
                  </div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
