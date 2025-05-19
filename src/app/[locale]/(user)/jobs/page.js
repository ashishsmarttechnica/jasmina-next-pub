import JobsMainPage from "@/components/jobs/JobsMainPage";
import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/",
});


const page = () => {
  return (
    <div className="py-5">
      <JobsMainPage />
    </div>
  );
};

export default page;
