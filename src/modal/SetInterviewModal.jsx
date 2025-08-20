"use client";
import { useScheduleInterview } from "@/hooks/interview/useScheduleInterview";
import { useUpdateInterview } from "@/hooks/interview/useUpdateInterview";
import useInterviewValidation from "@/hooks/validation/company/useInterviewValidation";
import getImg from "@/lib/getImg";
import { useTimeZonesOptions } from "@/utils/selectOptions";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { DatePicker, Input, Modal, SelectPicker } from "rsuite";

const SetInterviewModal = ({
  isOpen,
  onClose,
  jobId,
  candidateData,
  interviewId,
  isReschedule = false,
}) => {
  console.log(candidateData, "candidateData-----------------");

  const t = useTranslations("SetInterviewModal");
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [address, setAddress] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [isLoadingViewResume, setIsLoadingViewResume] = useState(false);
  const timeZones = useTimeZonesOptions();

  const { errors, validateField, validateForm } = useInterviewValidation();
  const { mutate: scheduleInterview, isLoading: isScheduleLoading } = useScheduleInterview(onClose);
  const { mutate: updateInterview, isLoading: isUpdateLoading } = useUpdateInterview(onClose);

  const isLoading = isScheduleLoading || isUpdateLoading;

  // Helper function to format date correctly without timezone issues
  const formatDateForAPI = (selectedDate) => {
    if (!selectedDate) return null;

    // Create a new date object and set it to the selected date at noon to avoid timezone issues
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    // Create date at noon in local timezone to avoid date shifting
    const localDate = new Date(year, month, day, 12, 0, 0, 0);

    // Format as YYYY-MM-DD
    const formattedDate = localDate.toLocaleDateString('en-CA'); // Returns YYYY-MM-DD format

    return formattedDate;
  };

  const handleSend = () => {
    const formData = { date, startTime, address, timeZone };
    if (validateForm(formData)) {
      if (isReschedule && interviewId) {
        // Update existing interview for reschedule
        const updateData = {
          date: formatDateForAPI(date),
          startTime,
          interviewAddress: address,
          timezone: timeZone,
        };
        updateInterview({ interviewId, data: updateData });
      } else {
        // Create new interview
        const newInterviewData = {
          companyId: Cookies.get("userId"),
          userId: candidateData?.userId,
          jobId,
          email: candidateData?.email,
          jobRole: candidateData?.jobRole || candidateData?.title,
          date: formatDateForAPI(date),
          name: candidateData?.name,
          startTime,
          interviewAddress: address,
          timeZone,
          experience: candidateData?.experience,
          resume: candidateData?.resume,
        };
        scheduleInterview(newInterviewData);
      }
    }
  };

  // Resume view logic (like ResumeTab)
  let fileName, fileUrl, fileExtension;
  if (typeof candidateData?.resume === "string") {
    fileName = candidateData.resume.split("/").pop();
    fileUrl = getImg(candidateData.resume);
    fileExtension = fileName.split(".").pop()?.toLowerCase();
  }

  // Function to get Google Docs viewer URL
  const getGoogleDocsViewerUrl = (url) => {
    let absoluteUrl = url;
    if (!url.startsWith("http")) {
      const baseUrl = window.location.origin;
      absoluteUrl = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
    }
    return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=false`;
  };

  const handleView = () => {
    if (!fileUrl) return;
    setIsLoadingViewResume(true);
    try {
      const viewerUrl = getGoogleDocsViewerUrl(fileUrl);
      window.open(viewerUrl, "_blank");
    } catch (error) {
      console.error("Error opening document:", error);
      window.open(fileUrl, "_blank");
    } finally {
      setIsLoadingViewResume(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setDate(null);
      setStartTime("");
      setAddress("");
      setTimeZone("Asia/Kolkata");
    }
  }, [isOpen]);

  console.log(candidateData, "candidateData");
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="sm"
      className="!max-h-[90vh] !w-[95%] overflow-hidden !p-0 sm:!max-h-[85vh] sm:!w-[90%] md:!w-[547px] bg-white"
    >
      <Modal.Header className="bg-white">
        <div className="mb-2 border-b border-slate-300 py-2">
          <div className="my-1 text-[20px] font-bold text-gray-900">
            {candidateData?.userId?.profile
              ?.fullName
              || candidateData?.originalData?.userId?.profile
                ?.fullName}
          </div>
          <div className="my-1 text-[14px] font-medium text-gray-700">{candidateData?.userId?.preferences?.jobRole || candidateData?.originalData
            .userId?.preferences?.jobRole}</div>
          <div className="text-[13px] text-[#007BFF]">{candidateData?.userId?.email || candidateData?.originalData?.userId?.email}</div>
          <div className="mb-2 text-[#888DA8]">
            {candidateData?.userId?.preferences?.yearsOfExperience
              ? t("experienceYears", { years: candidateData?.userId?.preferences?.yearsOfExperience })
              : t("experienceYears", { years: candidateData?.originalData?.userId?.preferences?.yearsOfExperience })
            }
          </div>
          {candidateData?.resume && (
            <div className="text-sm text-blue-600">
              <button
                type="button"
                onClick={handleView}
                disabled={isLoadingViewResume}
                className="underline disabled:opacity-50"
              >
                {isLoadingViewResume ? t("opening") : t("viewResume")}
              </button>
            </div>
          )}
        </div>
      </Modal.Header>

      <Modal.Body className="no-scrollbar h-full overflow-y-auto rounded-lg bg-white !p-1 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="font-semibold text-gray-900">{t("date")}*</label>
              <DatePicker
                oneTap
                value={date}
                onChange={(value) => {
                  setDate(value);
                  validateField("date", value);
                }}
                placeholder={t("selectDate")}
                shouldDisableDate={(d) => d < new Date().setHours(0, 0, 0, 0)}
                className="mt-1 w-full"
                format="yyyy-MM-dd"
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="flex-1">
              <label className="font-semibold text-gray-900">{t("startTime")}*</label>
              <Input
                type="time"
                value={startTime}
                onChange={(value) => {
                  setStartTime(value);
                  validateField("startTime", value);
                }}
                placeholder={t("startTime")}
                className="mt-1 w-full"
              />
              {errors.startTime && <p className="text-sm text-red-500">{errors.startTime}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="font-semibold text-gray-900">{t("timeZone")}*</label>
              <SelectPicker
                data={timeZones}
                value={timeZone}
                onChange={(value) => {
                  setTimeZone(value);
                  validateField("timeZone", value);
                }}
                placeholder={t("timeZone")}
                className="mt-1 w-full"
                searchable={false}
                defaultValue="Asia/Kolkata"
              />
              {errors.timeZone && <p className="text-sm text-red-500">{errors.timeZone}</p>}
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold text-gray-900">{t("interviewAddress")}*</label>
            <Input
              as="textarea"
              value={address}
              onChange={(value) => {
                setAddress(value);
                validateField("address", value);
              }}
              placeholder={t("interviewAddress")}
              className="mt-1 w-full"
              rows={4}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="bg-white">
        <div className="my-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="text-primary border-primary rounded border px-4 py-1.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t("close")}
          </button>
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-primary hover:text-primary hover:border-primary rounded-sm px-6 py-2 text-[13px] text-white hover:border hover:bg-white"
          >
            {isLoading
              ? isReschedule
                ? t("rescheduling")
                : t("scheduling")
              : isReschedule
                ? t("rescheduleInterview")
                : t("sendInterview")}
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SetInterviewModal;
