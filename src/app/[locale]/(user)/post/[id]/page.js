
import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";
import SinglePostLayout from "@/layout/SinglePostLayout";

export const metadata = getSeoMeta({
  title: "Feed | Jasmina",
  path: "/",
});

const page = () => {
  return (
    <div className="py-5">
        <SinglePostLayout />
    </div>
  );
};

export default page;
