"use client";
import { useState } from "react";
// import JobCards from "../JobCards";
import JobCards from "../JobCards";
import JobHeader from "../JobHeader";

const DefaultJob = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    lgbtq: true,
  });
  return (
    <div className="w-full">
      <JobHeader filters={filters} setFilters={setFilters} />
      <div className="mt-4 flex flex-col gap-4">
        <div className="">
          <JobCards filters={filters} />
        </div>
        <div className="">{/* <SingleJobDetail /> */}</div>
      </div>
    </div>
  );
};

export default DefaultJob;
