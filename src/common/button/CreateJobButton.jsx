"use client";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader } from "rsuite";

const CreateJobButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("CompanyMainFeed");
  const handlePostJobClick = () => {
    setIsLoading(true);
    router.push("/company/create-job");
  };

  return (
    <button
      className="bg-primary hover:bg-secondary/70 hover:border-primary hover:text-primary mt-0 w-full rounded-[4px] border border-transparent p-1 text-base text-white transition-all duration-200 ease-in disabled:opacity-70 sm:p-2"
      onClick={handlePostJobClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader size="sm" speed="slow" />
          <span>{t("loading")}</span>
        </div>
      ) : (
        t("postJob") || "Post a job"
      )}
    </button>
  );
};

export default CreateJobButton;
