"use client";
import { getConversations } from "@/api/chat.api";
import getImg from "@/lib/getImg";

import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ImageFallback from "../../../common/shared/ImageFallback";
import Search from "./Search";

export default function ChatSidebar({ onSelect, activeChat, refreshKey }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [conversations, setConversations] = useState([]);
  console.log("conversations:-----", conversations);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const t = useTranslations("Chat");

  // Get userId from cookies
  const userId = Cookies.get("userId");

  const getOtherUser = (conversation) => {
    if (!conversation) return null;
    const sender = conversation.sender;
    const receiver = conversation.receiver;
    // Compare against possible id fields as string
    const currentId = String(userId || "");
    const senderId = sender?.id || sender?._id;
    const receiverId = receiver?.id || receiver?._id;
    if (String(senderId || "") === currentId) return receiver;
    if (String(receiverId || "") === currentId) return sender;
    return receiver || sender;
  };

  const toLowerSafe = (value) => {
    if (typeof value === "string") return value.toLowerCase();
    if (value === null || value === undefined) return "";
    try {
      return String(value).toLowerCase();
    } catch {
      return "";
    }
  };

  // Fetch conversations
  const fetchConversations = async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await getConversations(userId);
      if (response.success) {
        setConversations(response.data.results || []);
      } else {
        setError("Failed to fetch conversations");
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setError(err.message || "Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [userId, refreshKey]);

  const filteredConversations = conversations.filter((conversation) => {
    const searchTerm = toLowerSafe(searchQuery);
    const otherUser = getOtherUser(conversation);
    const name = toLowerSafe(otherUser?.userName) || toLowerSafe(otherUser?.companyName);
    const role = toLowerSafe(otherUser?.jobRole) || toLowerSafe(otherUser?.industryType);
    return name.includes(searchTerm) || role.includes(searchTerm);
  });

  const handleChatSelect = async (conversation) => {
    console.log("=== ChatSidebar: Conversation Clicked ===");
    console.log("Raw conversation data000000000==========:", conversation);

    // Determine which user to display (sender or receiver)
    // Since we don't know which user is current, we'll show the receiver by default
    // or you can implement logic to determine current user from the conversation
    const otherUser = getOtherUser(conversation);
    console.log("Other user data:", conversation);

    // Create chat object with conversation data
    const selectedChat = {
      id: conversation.roomId,
      name: otherUser?.userName || otherUser?.companyName,
      role: otherUser?.jobRole || otherUser?.industryType,
      avatar: otherUser?.photo
        ? getImg(otherUser.photo)
        : otherUser?.logoUrl
          ? getImg(otherUser.logoUrl)
          : "/no-img.png",
      messages: [],
      conversationId: otherUser?.id || otherUser?._id,
      roomId: conversation.roomId, // Add roomId for fetching messages
      companyName: otherUser?.companyName, // Add companyName for company detection
      // For company chats, use the company ID as conversationId
      companyId: otherUser?.companyName ? (otherUser?.id || otherUser?._id) : null,
    };

    console.log("=== ChatSidebar: Selected Chat Object ===");
    console.log("Selected chat being passed to ChatWindow:", selectedChat);
    console.log("Room ID:", selectedChat.roomId);
    console.log("Chat ID:", selectedChat.id);
    console.log("User Name:", selectedChat.name);
    console.log("User Role:", selectedChat.role);
    console.log("Avatar URL:", selectedChat.avatar);
    console.log("Conversation ID:", selectedChat.conversationId);
    console.log("=== ChatSidebar: End ===");

    onSelect(selectedChat);
  };

  console.log("filteredConversations:", filteredConversations);

  return (
    <div className="no-scrollbar h-full w-full overflow-y-auto bg-white md:border-r md:border-[#000000]/10 xl:w-[275.5px]">
      {/* Search */}
      <div className="sticky top-0 z-10 bg-white p-3.5 pb-[20px] md:border-b md:border-[#000000]/10">
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("sidebar.searchPlaceholder")}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="p-4 text-center text-gray-400">{t("sidebar.loading")}</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">
          {t("sidebar.error")}: {error}
          <button className="mt-2 block text-blue-500 underline" onClick={fetchConversations}>
            {t("sidebar.retry")}
          </button>
        </div>
      ) : filteredConversations.length === 0 ? (
        <div className="p-4 text-center text-gray-400">{t("sidebar.empty")}</div>
      ) : (
        filteredConversations.map((conversation) => {
          const otherUser = getOtherUser(conversation);

          return (
            <div
              key={conversation._id}
              onClick={() => handleChatSelect(conversation)}
              className={`flex cursor-pointer items-center gap-3 border-b border-slate-200 p-3 py-4 hover:bg-gray-100 ${activeChat?.id === conversation.roomId ? "bg-gray-100" : ""
                }`}
            >
              <ImageFallback
                src={
                  otherUser?.photo
                    ? getImg(otherUser.photo)
                    : otherUser?.logoUrl
                      ? getImg(otherUser.logoUrl)
                      : "/no-img.png"
                }
                alt="avatar"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">{otherUser?.userName || otherUser?.companyName}</div>
                <div className="text-xs text-gray-500">
                  {otherUser?.jobRole || otherUser?.industryType}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
