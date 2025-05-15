"use client";
import React, { use, useRef, useState } from "react";
import ReusableForm from "../../form/ReusableForm";
import { toast } from "react-toastify";
import useUpdateProfile from "@/hooks/user/useUpdateProfile";
import useAuthStore from "@/store/auth.store";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Loader } from "rsuite";

const ResumeUpload = ({ setActiveTab }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const t = useTranslations("UserProfile.resume");
  const {
    mutate: updateProfile,
    isPending,
    error: apiError,
  } = useUpdateProfile();

  const handleFileButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected file:", file.name);
      setSelectedFile(file);
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // ✅ User already has resume and not uploading a new one
    if (!selectedFile && user?.resume) {
      setActiveTab(4);
      return;
    }

    // ❌ No resume and no file selected
    if (!selectedFile && !user.resume) {
      setError(t("resumeError"));
      return;
    }

    const validExtensions = [".pdf", ".doc", ".docx", ".tex", ".webp"];
    const fileExtension = selectedFile?.name.split(".").pop();

    if (!validExtensions.includes(`.${fileExtension.toLowerCase()}`)) {
      setError(t("fileError"));
      return;
    }

    const submitData = new FormData();
    submitData.append("resume", selectedFile);
    submitData.append("steps", 4);

    updateProfile(submitData, {
      onSuccess: (res) => {
        if (res.success) {
          setActiveTab(4);
        }
      },
    });
  };

  const onSkipClick = () => {
    setActiveTab(4);
  };
  return (
    <ReusableForm
      title={t("title")}
      maxWidth="max-w-[698px]"
      subtitle={t("subTitle")}
    >
      <form className="space-y-2 mt-5" onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <div className="shadow-[0px_4px_25px_0px_rgba(136,141,168,0.20)] border border-black/5 bg-white px-14 py-4 rounded-[10px] mt-5">
            <p className="text-[#888DA8] mt-5">{`${t("description")}*`}</p>
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx,.tex"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className="btn-fill max-w-[210px]"
                onClick={handleFileButtonClick}
              >
                {t("Upload")}
              </button>
              <div className="mt-5">
                {selectedFile && (
                  <p className="text-sm text-gray-600 ">{selectedFile.name}</p>
                )}
                {user?.resume && (
                  <p className="text-sm text-gray-600 "> {t("Uploaded")} </p>
                )}
                {error && <p className="text-sm text-red-500 ">{error}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="block space-y-4">
            <button
              type="button"
              className="btn-white-fill"
              onClick={onSkipClick}
              disabled={isPending}
            >
              <>
                {t("Skip")} <span className="text-[20px]">&#187;</span>
              </>
            </button>
          </div>

          <div className="block space-y-4">
            <button type="submit" className="btn-fill" disabled={isPending}>
              {isPending ? (
                <div>
                  <Loader inverse />
                </div>
              ) : (
                <>
                  <div className="text-[20px]">{t("Next")}</div>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </ReusableForm>
  );
};

export default ResumeUpload;
