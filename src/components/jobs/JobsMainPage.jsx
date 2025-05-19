import JobsLayout from "@/layout/JobsLayout";
import React from "react";
import MyJobs from "./leftSidebar/MyJobs";
import DefaultJob from "./defaultJob/DefaultJob";

const JobsMainPage = () => {
  return (
    <JobsLayout leftComponents={[<MyJobs key="left1" />]}>
      <DefaultJob />
    </JobsLayout>
  );
};

export default JobsMainPage;
