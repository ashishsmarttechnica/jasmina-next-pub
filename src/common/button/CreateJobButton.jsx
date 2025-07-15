"use client";
import useCompanyVerification from "@/hooks/company/useCompanyVerification";
import { useRouter } from "@/i18n/navigation";
import CompanyVerificationModal from "@/modal/CompanyVerificationModal";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader } from "rsuite";
import useNewJobPostStore from "../../store/newjobpost.store";

const CreateJobButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const t = useTranslations("CompanyMainFeed");
  const meassage = useNewJobPostStore((s) => s.meassage);
  const isverified = useNewJobPostStore((s) => s.isverified);
  const { data: verificationData, isLoading: isVerificationLoading } = useCompanyVerification();
  console.log("verificationData in CreateJobButton:", meassage);

  const handlePostJobClick = async () => {
    setIsLoading(true);
    try {
      // Check if company is verified
      if (!isverified) {
        setShowVerificationModal(true);
        setIsLoading(false);
        return;
      }

      router.push("/company/create-job");
    } catch (error) {
      console.error("Verification check error:", error);
      setShowVerificationModal(true);
    } finally {
      setIsLoading(false);
    }
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
        message={meassage}
      />
    </>
  );
};

export default CreateJobButton;
