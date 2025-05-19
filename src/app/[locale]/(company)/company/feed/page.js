
import CompanyMainFeed from "@/components/company/feed/CompanyMainFeed";
import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/",
});

const page = () => {
  return (
    <div className="py-5">
        <CompanyMainFeed />
    </div>
  );
};

export default page;
