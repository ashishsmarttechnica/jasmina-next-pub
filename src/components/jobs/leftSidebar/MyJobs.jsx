import Card from "@/common/card/Card";
import CardHeading from "@/common/card/CardHeading";
import React from "react";
import { Link } from "@/i18n/navigation";
import List from "@/assets/svg/jobs/List";
import { LuBookmark } from "react-icons/lu";

const MyJobs = () => {
  return (
    <Card className="md:sticky md:top-4 w-full md:max-w-[266px] xl:max-w-[266px] xl:w-[266px] ">
      <CardHeading title={"My jobs"} />

      <div className="w-full md:max-w-[1000px]  text-[#888DA8]">
        <Link
          href="/jobs/applied-jobs"
          className="no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline"
        >
          <div className="flex border-b border-[#888DA8]/10 items-center justify-between py-3 hover:bg-[#D9D9D9]/[34%]">
            <div className="flex items-center gap-2.5 px-4 text-gray-500">
              <List className="text-2xl" />
              <span className="text-[13px] font-normal">Applied Jobs</span>
            </div>
            <span className="text-black font-bold text-xs px-4">5</span>
          </div>
        </Link>
        <Link
          href="/jobs/save-jobs"
          className="no-underline hover:no-underline focus:no-underline active:no-underline visited:no-underline"
        >
          <div className="flex items-center justify-between py-3 hover:bg-[#D9D9D9]/[34%]">
            <div className="flex items-center gap-2.5 px-4 text-gray-500 ">
              <LuBookmark className="text-sm" />
              <span className="text-[13px] font-normal">Save Jobs</span>
            </div>
            <span className="text-black font-bold text-xs px-4">23</span>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default MyJobs;
