import React from "react";

function Card({ children, className = "" }) {
  return (
    <div
      className={`w-full md:max-w-[700px]  2xl:w-[266px]  bg-white rounded-md text-black flex flex-col items-center text-center font-Ubuntu border border-black/10 shadow-card ${className} `}
    >
      {children}
    </div>
  );
}

export default Card;
