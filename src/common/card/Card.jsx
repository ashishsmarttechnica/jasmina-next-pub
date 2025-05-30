import React from "react";

function Card({ children, className = "", onClick }) {
  return (
    <div
      className={`w-full md:max-w-[700px]  md:w-[266px]  bg-white rounded-md text-black flex flex-col font-Ubuntu border border-black/10 shadow-card ${className} `}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
