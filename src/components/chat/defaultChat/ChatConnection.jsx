"use client"

import { useState } from "react"
import CommonTitle from "../../../common/CommonTitle"
import ChatSidebar from "./ChatSidebar"
import ChatWindow from "./ChatWindow"
import DefaultChatView from "./DefaultChatView"

// Dummy chat data
const dummyChats = {
  conversations: [
    {
      id: 1,
      name: "Amit Sharma",
      role: "Frontend Developer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessageTime: "10:30 AM",
      messages: [
        {
          from: "user",
          text: "Hi Amit!",
          timestamp: new Date().toISOString(),
        },
        {
          from: "other",
          text: "Hello! How can I help you?",
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      id: 2,
      name: "Priya Singh",
      role: "UI/UX Designer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessageTime: "Yesterday",
      messages: [
        {
          from: "user",
          text: "Hi Priya, can you share the latest design?",
          timestamp: new Date().toISOString(),
        },
        {
          from: "other",
          text: "Sure, sending it now!",
          timestamp: new Date().toISOString(),
        },
      ],
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "Backend Developer",
      avatar: "https://randomuser.me/api/portraits/men/65.jpg",
      lastMessageTime: "2 days ago",
      messages: [
        {
          from: "user",
          text: "API integration done?",
          timestamp: new Date().toISOString(),
        },
        {
          from: "other",
          text: "Yes, please check now.",
          timestamp: new Date().toISOString(),
        },
      ],
    },
    
  ],
}

const ChatConnection = () => {
  const [chats] = useState(dummyChats)
  const [activeChat, setActiveChat] = useState(null)

  const handleSelectChat = (chat) => {
    setActiveChat(chat)
  }

  const handleBackToSidebar = () => {
    setActiveChat(null)
  }

  return (
    <div>
        <div className="w-full  flex gap-4  flex-col xl:flex-row">
          <div className="md:w-full xl:max-w-[829px] xl:w-[829px] bg-white rounded-md flex flex-col ">
            <div className="">

            <CommonTitle title="Messaging" />
            </div>
            <div className="flex flex-1 overflow-hidden">
              <div
                className={`w-full md:max-w-[276.5px] overflow-auto no-scrollbar border-r border-slate-200 overflow-y-auto ${
                  activeChat ? "hidden md:block" : "block"
                }`}
              >
                <ChatSidebar
                  chats={chats.conversations}
                  onSelect={handleSelectChat}
                  activeChat={activeChat}
                />
              </div>

              <div
                className={`w-full md:w-full ${
                  activeChat ? "block" : "hidden"
                } md:block h-full`}
              >
                {activeChat ? (
                  <ChatWindow chat={activeChat} onBack={handleBackToSidebar} />
                ) : (
                  <DefaultChatView />
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChatConnection
