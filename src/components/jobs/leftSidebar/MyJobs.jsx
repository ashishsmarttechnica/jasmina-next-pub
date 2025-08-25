"use client";

import List from "@/assets/svg/jobs/List";
import Card from "@/common/card/Card";
import CardHeading from "@/common/card/CardHeading";
import useGetAppliedJobs from "@/hooks/job/useGetAppliedJobs";
import useGetSavedJobs from "@/hooks/job/useGetSavedJobs";
import { Link } from "@/i18n/navigation";
import useAppliedJobStore from "@/store/appliedJob.store";
import useJobStore from "@/store/job.store";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { LuBookmark } from "react-icons/lu";

const MyJobs = () => {
  const savedJobs = useJobStore((state) => state.savedJobs);
  const appliedJobs = useAppliedJobStore((state) => state.appliedJobs);
  const getSavedJobs = useJobStore((state) => state.getSavedJobs);
  const t = useTranslations("Jobs");

  // Use the hooks to fetch data
  useGetSavedJobs();
  useGetAppliedJobs();

  // Additional fetch on mount to ensure data is loaded
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      getSavedJobs({
        userId,
        onSuccess: () => {
          console.log(t("SavedJobsFetched"));
        },
        onError: (error) => {
          console.error(t("ErrorfetchingsavedjobsinMyJobs:"), error);
        },
      });
    }
  }, [getSavedJobs]);

  return (
    <Card className="w-full sm:w-auto sm:max-w-full md:sticky md:top-4 md:max-w-[236px] xl:w-[256px] xl:max-w-[266px]">
      <CardHeading title={t("myJobs")} />

      <div className="w-full text-[#888DA8] sm:max-w-full md:max-w-[1000px]">
        <Link
          href="/jobs/applied-jobs"
          className="no-underline visited:no-underline hover:no-underline focus:no-underline active:no-underline"
        >
          <div className="flex items-center justify-between border-b border-[#888DA8]/10 py-3 hover:bg-[#D9D9D9]/[34%]">
            <div className="flex items-center gap-2.5 px-4 text-gray-500">
              <List className="text-2xl" />
              <span className="text-[13px] font-normal">{t("SubmittedApplications")}</span>
            </div>
            <span className="px-4 text-xs font-bold text-black">{appliedJobs.length}</span>
          </div>
        </Link>
        <Link
          href="/jobs/save-jobs"
          className="no-underline visited:no-underline hover:no-underline focus:no-underline active:no-underline"
        >
          <div className="flex items-center justify-between py-3 hover:bg-[#D9D9D9]/[34%]">
            <div className="flex items-center gap-2.5 px-4 text-gray-500">
              <LuBookmark className="text-sm" />
              <span className="text-[13px] font-normal">{t("savedjobs")}</span>
            </div>
            <span className="px-4 text-xs font-bold text-black">{savedJobs.length}</span>
          </div>
        </Link>
      </div>
    </Card>
  );
};

export default MyJobs;
