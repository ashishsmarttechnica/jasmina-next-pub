"use client";
import React from "react";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import Image from "next/image";
import userImg from "@/assets/feed/user-1.png";

const connectionsData = [
  {
    name: "Ronald Richards",
    title: "Sales Executive",
    avatar: userImg,
    online: true,
    location: "Newark, New Jersey",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
  {
    name: "Kristin Watson",
    title: "Business Analyst",
    avatar: userImg,
    online: true,
    location: "Boise, Idaho",
    connectedOn: "10 March 2025",
    canMessage: true,
    isConnected: false,
  },
  {
    name: "Floyd Miles",
    title: "Data Scientist",
    avatar: userImg,
    online: true,
    location: "Denver, Colorado",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
  {
    name: "Esther Howard",
    title: "HR Specialist",
    avatar: userImg,
    online: true,
    location: "Miami, Florida",
    connectedOn: "10 March 2025",
    canMessage: false,
    isConnected: false,
  },
];

const CompanyConnection = () => {
  return (
    <div>
      <Card>
        <CardHeading title="Connection" />
        <div className="w-full px-5 flex flex-col gap-4 py-4">
          {connectionsData.slice(0, 5).map((user, index) => (
            <div
              className="flex items-center justify-between w-full"
              key={index}
            >
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full w-full h-full object-cover"
                  />
                  {user.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#0F8200] border-[1.5px] border-white rounded-full" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-medium">{user.name}</p>
                  <p className="text-xs text-[#888DA8] font-normal mt-0.5">
                    {user.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompanyConnection;
