"use client";
import React from "react";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Contact from "@/assets/svg/feed/Contact";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { suggestions } from "./Data/Data";

function UserSuggestionCard({ type, title, buttonType }) {
  const handleContactClick = (id) => {
    console.log("Contact clicked:", id);
  };

  const handleInviteAction = (id, action) => {
    console.log(`User ${id} ${action}`);
  };

  return (
    <Card className="md:max-w-full md:w-full xl:max-w-[266px]">
      <CardHeading title={title} />
      <div
        className={`w-full py-4 ${
          type === "connection" ? "px-5" : "px-2"
        } flex flex-col gap-4`}
      >
        {suggestions.slice(0, 5).map((user, index) => (
          <div
            key={user.id || index}
            className="flex items-center justify-between w-full"
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
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-[1.5px] border-white rounded-full" />
                )}
              </div>
              <div className="text-left">
                <p className="text-[13px] font-medium">{user.name}</p>
                <p className="text-xs text-grayBlueText font-normal mt-0.5">
                  {user.title}
                </p>
              </div>
            </div>

            {/* ✅ Handle button rendering based on buttonType */}
            {buttonType === "contact" && (
              <button
                onClick={() => handleContactClick(user.id)}
                className="bg-secondary border border-transparent rounded-sm py-2 px-2 hover:bg-transparent hover:border-primary transition-colors duration-300"
              >
                <Contact />
              </button>
            )}

            {buttonType === "invite" && (
              <div className="flex gap-2 p-2">
                <button
                  onClick={() => handleInviteAction(user.id, "reject")}
                  className="border-[0.5px] hover:text-white border-grayBlueText rounded-sm items-center py-1.5 px-1.5 hover:border-red-600 text-grayBlueText hover:bg-red-600 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <IoClose className="w-[15px] h-[15px] font-medium" />
                </button>
                <button
                  onClick={() => handleInviteAction(user.id, "accept")}
                  className="border-[0.5px] text-white border-primary bg-primary hover:text-black rounded-sm items-center py-1.5 px-1.5 hover:border-grayBlueText hover:bg-transparent cursor-pointer"
                >
                  <FaCheck className="w-[15px] h-[15px] font-medium" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default UserSuggestionCard;
