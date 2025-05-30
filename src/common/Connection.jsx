"use client";
import Image from "next/image";
import Card from "./card/Card";
import CardHeading from "./card/CardHeading";
import { suggestions } from "./Data/Data";

const Connection = () => {
  return (
    <div>
      <Card>
        <CardHeading title="Connection" />
        <div className="flex w-full flex-col gap-4 px-5 py-4">
          {suggestions.slice(0, 5).map((user, index) => (
            <div className="flex w-full items-center justify-between" key={index}>
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px] rounded-full object-cover"
                  />
                  {user.online && (
                    <span className="bg-primary absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-[1.5px] border-white" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-[13px] font-medium">{user.name}</p>
                  <p className="text-grayBlueText mt-0.5 text-xs font-normal">{user.title}</p>
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
