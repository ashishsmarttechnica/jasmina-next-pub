"use client";
import { useState } from "react";
// import JobCards from "../JobCards";
import JobHeader from "../JobHeader";
// import SaveJobCards from "../SaveJobCards";
import JobCards from "../JobCards";
import SaveJobCards from "../SaveJobCards";
import JobsLayout from "../../../layout/JobsLayout";
import MyJobs from "../leftSidebar/MyJobs";

const SaveDefaultJob = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    lgbtq: true,
  });
  return (
    <JobsLayout leftComponents={[<MyJobs key="left1" />]}>
    <div className="w-full">
      <JobHeader filters={filters} setFilters={setFilters} />
      <div className="mt-4 flex flex-col gap-4">
        <div className="">
          <SaveJobCards filters={filters} />
        </div>
        <div className="">{/* <SingleJobDetail /> */}</div>
        </div>
      </div>
    </JobsLayout>
  );
};

export default SaveDefaultJob;
