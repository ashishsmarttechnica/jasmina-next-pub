"use client";
import useCompanyVerification from "@/hooks/company/useCompanyVerification";
import { useRouter } from "@/i18n/navigation";
import CompanyVerificationModal from "@/modal/CompanyVerificationModal";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader } from "rsuite";

const CreateJobButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const t = useTranslations("CompanyMainFeed");

  const { data: verificationData, isLoading: isVerificationLoading } = useCompanyVerification();

  const handlePostJobClick = async () => {
    setIsLoading(true);

    // Check if company is verified
    if (!verificationData?.isVerified) {
      setShowVerificationModal(true);
      setIsLoading(false);
      return;
    }

    router.push("/company/create-job");
  };

  return (
    <>
      <button
        className="bg-primary hover:bg-secondary/70 hover:border-primary hover:text-primary mt-0 w-full rounded-[4px] border border-transparent p-1 text-base text-white transition-all duration-200 ease-in disabled:opacity-70 sm:p-2"
        onClick={handlePostJobClick}
        disabled={isLoading || isVerificationLoading}
      >
        {isLoading || isVerificationLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader size="sm" speed="slow" />
            <span>{t("loading")}</span>
          </div>
        ) : (
          t("postJob") || "Post a job"
        )}
      </button>

      <CompanyVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />
    </>
  );
};

export default CreateJobButton;
