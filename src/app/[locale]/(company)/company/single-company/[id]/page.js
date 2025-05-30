import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";
import MainSingleCompany from "@/components/company/singleCompany/MainSingleCompany";


export const metadata = getSeoMeta({
  title: "single-company | Jasmina",
  path: "/",
});

const page = () => {
  return (
    <div className="py-5">
      <MainSingleCompany />
    </div>
  );
};

export default page;
