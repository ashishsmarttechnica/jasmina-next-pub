import React from "react";
import JobHeader from "../JobHeader";
import JobCards from "../JobCards";
import SingleJobDetail from "../SingleJobDetail";

const DefaultJob = () => {
  return (
    <div className="w-full ">
      <JobHeader />
      <div className="flex flex-col gap-4  mt-4 ">
        <div className="">
          <JobCards />
        </div>
        <div className="">
          {/* <SingleJobDetail /> */}
        </div>
      </div>
    </div>
  );
};

export default DefaultJob;
