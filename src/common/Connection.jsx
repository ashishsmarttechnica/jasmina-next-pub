"use client";
import React from "react";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import Image from "next/image";
import { suggestions } from "./Data/Data";

const Connection = () => {
  return (
    <div>
      <Card>
        <CardHeading title="Connection" />
        <div className="w-full px-5 flex flex-col gap-4 py-4">
          {suggestions.slice(0, 5).map((user, index) => (
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

export default Connection;
