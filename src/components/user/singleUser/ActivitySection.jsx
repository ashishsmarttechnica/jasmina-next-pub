import Activity from "@/assets/svg/user/Activity";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import PostSlider from "./PostSlider";

const ActivitySection = () => {
  return (
    <div className=" bg-gray-50 rounded-[5px] shadow-card ">
      <div className="flex items-center border-b border-black/10 py-3 px-5 justify-between ">
        <h2 className="text-xl font-semibold flex items-center  gap-2">
          <Activity /> Activity
        </h2>
        <h4
          href="#"
          className="text-[13px] flex gap-2 font-medium items-center cursor-pointer text-[#888DA8] no-underline "
        >
          See All <FaArrowRight className="text-xl font-normal" />
        </h4>
      </div>


      <div className="m-5 pb-4">
        <PostSlider />
      </div>
    </div>
  );
};

export default ActivitySection;
