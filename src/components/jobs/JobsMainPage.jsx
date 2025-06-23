import JobsLayout from "@/layout/JobsLayout";
import DefaultJob from "./defaultJob/DefaultJob";
import MyJobs from "./leftSidebar/MyJobs";

const JobsMainPage = () => {
  return (
    <JobsLayout leftComponents={[<MyJobs key="left1" />]}>
      <DefaultJob />
    </JobsLayout>
  );
};

export default JobsMainPage;
