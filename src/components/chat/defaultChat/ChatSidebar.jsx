"use client"
import { useState } from "react";
import Search from "./Search";

export default function ChatSidebar({ chats, onSelect, activeChat }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full xl:w-[275.5px] md:border-r md:border-[#000000]/10 bg-white">
      <div className="p-3.5 pb-[20px] md:border-b md:border-[#000000]/10 sticky top-0 bg-white z-10">
        <Search
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search messages"
        />
      </div>

      {filteredChats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => onSelect(chat)}
          className={`flex items-center gap-3 p-3 cursor-pointer border-b py-4 border-slate-200 hover:bg-gray-100 ${
            activeChat?.id === chat.id ? "bg-gray-100" : ""
          }`}
        >
          <img
            src={chat.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <div className="font-medium">{chat.name}</div>
            <div className="text-xs text-gray-500">{chat.role}</div>
          </div>
          <div className="text-xs text-gray-400">{chat.lastMessageTime}</div>
        </div>
      ))}
    </div>
  );
}
