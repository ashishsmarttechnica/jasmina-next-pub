import ApplyNowForm from "@/components/jobs/ApplyNowForm/ApplyNowForm";
import SingleJobDetail from "@/components/jobs/SingleJobDetail";
import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/",
});


const page = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="my-4">
          <div className="flex flex-col md:flex-row gap-4">
            <ApplyNowForm />
            <SingleJobDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
