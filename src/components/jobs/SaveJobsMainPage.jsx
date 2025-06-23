"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import JobHeader from "./JobHeader";
import SaveJobCards from "./SaveJobCards";
import JobsLayout from "../../layout/JobsLayout";
import MyJobs from "./leftSidebar/MyJobs";

const SaveJobsMainPage = () => {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    lgbtq: true,
  });

  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");

  return (
    <JobsLayout leftComponents={[<MyJobs key="left1" />]}>
      <div className="w-full">
        <JobHeader filters={filters} setFilters={setFilters} showSaveJobsLink={false} />
        <div className="mt-4 flex flex-col gap-4">
          <div className="">
            <SaveJobCards filters={filters} jobId={jobId} isSavedJobs={true} />
          </div>
        </div>
      </div>
    </JobsLayout>
  );
};

export default SaveJobsMainPage;
