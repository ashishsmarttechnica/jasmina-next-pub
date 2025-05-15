import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import User from "./User";
import { suggestions } from "./Data/Data";

function Network() {
  return (
    <div>
      <Card className="md:max-w-[700px] xl:max-w-[266px] md:w-full">
        <CardHeading title="Network Invites" />
        <div className="w-full py-4 px-1 pl-4 flex flex-col gap-4">
          {suggestions.slice(0, 5).map((person, index) => (
            <User
              key={index}
              avatar={person.avatar}
              name={person.name}
              title={person.title}
              online={person.online}
              action={
                <div className="flex gap-2 p-2">
                  <button className="border-[0.5px] hover:text-white border-[#888DA8] rounded-sm items-center py-1.5 px-1.5 hover:border-red-600 text-[#888DA8] hover:bg-red-600  transition-all duration-300 hover:scale-105 cursor-pointer">
                    <IoClose className="w-[15px] h-[15px] font-medium" />
                  </button>
                  <button className="border-[0.5px] text-white border-[#0F8200] bg-[#0F8200] hover:text-black rounded-sm items-center py-1.5 px-1.5 hover:border-[#888DA8] hover:border-[0.5px]   hover:bg-transparent   cursor-pointer">
                    <FaCheck className="w-[15px] h-[15px] font-medium" />
                  </button>
                </div>
              }
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Network;
