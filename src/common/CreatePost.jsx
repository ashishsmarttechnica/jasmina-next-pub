"use client";
import React from "react";
import { GoImage } from "react-icons/go";
import Image from "next/image";
import Uploadimg from "@/assets/Form/Uploadimg.png";

const CreatePost = () => {
  return (
    <div className="cust-card mb-4 ">
      <div className="border-b border-grayBlueText/50 py-4.5 pl-12 relative">
        <h2 className="text-primary font-medium text-sm b ">Do Your Post</h2>
        <div className="absolute -bottom-0 left-0 w-[181px] h-[2px] rounded-full bg-primary"></div>
      </div>

      <div className="flex items-center gap-3.5 px-4 pt-[15px]  pb-5 border-b border-grayBlueText/50">
        <div className="relative">
          <Image
            src={Uploadimg}
            alt="user"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-600 rounded-full border-2 border-white"></span>
        </div>
        <div className="text-grayBlueText text-[13px] font-medium ">
          Start a Post
        </div>
      </div>

      <div className="flex items-center justify-between py-3.5 ps-7 pe-[17px]">
        <button className="flex items-center text-grayBlueText text-[13px] font-normal hover:text-green-600 gap-2">
          <GoImage className="w-4 h-4 text-grayBlueText" />
          <span>Media</span>
        </button>
        <button className="py-1 min-w-[85px] bg-primary hover:text-primary border border-primary hover:bg-transparent transition-all duration-75 ease-in text-white rounded-sm text-sm">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
