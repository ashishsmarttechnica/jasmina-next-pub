import MainSingleUser from "@/components/user/singleUser/MainSingleUser";
import { getSeoMeta } from "@/lib/seoMetadata";
import React from "react";


export const metadata = getSeoMeta({
  title: "single-user | Jasmina",
  path: "/",
});

const page = () => {
  return (
    <div className="py-5">
      <MainSingleUser />
    </div>
  );
};

export default page;
