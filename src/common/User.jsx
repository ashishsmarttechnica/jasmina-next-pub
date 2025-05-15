import Image from "next/image";
import React from "react";

function User({ avatar, name, title, online, action }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <div className="relative w-10 h-10">
          <Image
            src={avatar}
            alt={name}
            className="rounded-full w-full h-full object-cover"
          />
          {online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary border-[1.5px] border-white rounded-full" />
          )}
        </div>
        <div className="text-left">
          <p className="text-[13px] font-medium">{name}</p>
          <p className="text-xs text-grayBlueText font-normal mt-0.5">{title}</p>
        </div>
      </div>
      {action && <div className="ml-2">{action}</div>}
    </div>
  );
}

export default User;
