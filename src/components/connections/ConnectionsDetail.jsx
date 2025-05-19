"use client";
import React, { useState, useEffect } from "react";
import user1 from "@/assets/feed/user-1.png";
import user2 from "@/assets/feed/user-2.png";
import user3 from "@/assets/feed/user-3.png";
import microsoft from "@/assets/connections/microsoft.png";
import apple from "@/assets/connections/apple.png";
import app from "@/assets/connections/app.png";
import canon from "@/assets/connections/canon.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { motion } from "framer-motion";
import Image from "next/image";
import ConnectionsLayout from "@/layout/ConnectionsLayout";
import UserSuggestionCard from "@/common/UserSuggestionCard";

const peopleConnections = [
  {
    id: 1,
    name: "Darlene Robertson",
    title: "Web Designer",
    avatar: user1,
    online: true,
    location: "Great Falls, Maryland",
    connectedOn: "10 March 2025",
    canMessage: true,
    isConnected: true,
  },
  {
    id: 2,
    name: "Marvin McKinney",
    title: "Medical Assistant",
    avatar: user2,
    online: true,
    location: "Lansing, Illinois",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
  {
    id: 3,
    name: "Jenny Wilson",
    title: "Dog Trainer",
    avatar: user3,
    online: true,
    location: "Coppell, Virginia",
    connectedOn: "10 March 2025",
    canMessage: true,
    isConnected: true,
  },
  {
    id: 4,
    name: "Darrell Steward",
    title: "Nursing Assistant",
    avatar: user1,
    online: true,
    location: "Lafayette, California",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
];

const companyConnections = [
  {
    id: 1,
    name: "Sony",
    website: "www.cnet.com",
    avatar: microsoft,
    online: true,
    location: "Tokyo, Japan",
    connectedOn: "10 March 2025",
  },
  {
    id: 2,
    name: "Apple",
    website: "www.apple.com",
    avatar: apple,
    online: true,
    location: "Cupertino, California",
    connectedOn: "10 March 2025",
  },
  {
    id: 3,
    name: "Louis Vuitton",
    website: "www.louisvuitton.com",
    avatar: app,
    online: true,
    location: "Paris, France",
    connectedOn: "10 March 2025",
  },
  {
    id: 4,
    name: "Canon",
    website: "www.canon.com",
    avatar: canon,
    online: true,
    location: "Tokyo, Japan",
    connectedOn: "10 March 2025",
  },
];

const ConnectionsDetail = () => {
  const [activeTab, setActiveTab] = useState("people");
  const [connections, setConnections] = useState(peopleConnections);

  useEffect(() => {
    setConnections(
      activeTab === "people" ? peopleConnections : companyConnections
    );
  }, [activeTab]);

  const handleRemoveConnection = (connectionId) => {
    setConnections((prev) => prev.filter((conn) => conn.id !== connectionId));
  };

  const handleSendMessage = (connectionId) => {
    // This will be implemented when API is integrated
    console.log("Sending message to connection:", connectionId);
  };

  return (
    <ConnectionsLayout
      RightComponents={[
        <UserSuggestionCard
          key="right1"
          title="People you might know"
          type="suggestion"
          buttonType="contact"
        />,
      ]}
    >
      <div className="bg-white shadow rounded-md">
        <div className="bg-white z-10">
          <div className="border-b border-black/10">
            <h2 className="text-xl font-medium py-4 px-4 sm:px-6">
              {connections.length} Connections
            </h2>
          </div>

          <div className="relative flex gap-0 text-[14px] font-medium border-b border-black/10">
            <button
              onClick={() => setActiveTab("people")}
              className={`py-3.5 px-4 sm:px-6 outline-none ${
                activeTab === "people" ? "text-[#0F8200]" : "text-[#888DA8]"
              }`}
            >
              People
            </button>
            <button
              onClick={() => setActiveTab("company")}
              className={`py-3.5 px-4 sm:px-6 outline-none ${
                activeTab === "company" ? "text-[#0F8200]" : "text-[#888DA8]"
              }`}
            >
              Company
            </button>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
              className="absolute bottom-[-2.3px] h-1 bg-[#0F8200]"
              style={{
                width: activeTab === "people" ? "78px" : "90px",
                left: activeTab === "people" ? "0px" : "99px",
              }}
            />
          </div>
        </div>

        <div className="divide-y divide-black/10 px-4 sm:px-5">
          {connections.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between py-4 sm:items-center gap-4 px-2 sm:px-4 hover:bg-gray-50 transition"
            >
              <div className="flex flex-row gap-4">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-14 h-14 lg:w-16 lg:h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="font-medium text-base sm:text-[16px]">
                    {item.name}
                  </h3>
                  <p className="text-sm font-normal text-[#888DA8] pb-1">
                    {item.title}
                  </p>
                  <p className="text-xs flex items-center text-[#888DA8] gap-1">
                    <HiOutlineLocationMarker className="w-4 h-4" />
                    {item.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => handleSendMessage(item.id)}
                    className="w-full text-[#0F8200] border border-[#0F8200] px-4 sm:px-6 py-1 font-normal text-sm rounded-[2px] hover:bg-green-100"
                  >
                    Message
                  </button>
                  <button
                    onClick={() => handleRemoveConnection(item.id)}
                    className="w-full text-[#888DA8] border border-[#888DA8] px-4 py-1 text-sm font-normal rounded-[2px] hover:bg-gray-200"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center md:text-right sm:mt-1">
                  Connected on {item.connectedOn}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConnectionsLayout>
  );
};

export default ConnectionsDetail;
