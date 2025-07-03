"use client";
import useInterviewValidation from "@/hooks/validation/company/useInterviewValidation";
import { useTimeZonesOptions } from "@/utils/selectOptions";
import { useEffect, useState } from "react";
import { DatePicker, Input, Modal, SelectPicker } from "rsuite";

const SetInterviewModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [address, setAddress] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const timeZones = useTimeZonesOptions();

  const { errors, validateField, validateForm } = useInterviewValidation();

  const handleSend = () => {
    const formData = { date, startTime, address, timeZone };
    if (validateForm(formData)) {
    }
  };

  useEffect(() => {
    if (isOpen) {
      setDate(null);
      setStartTime("");
      setAddress("");
      setTimeZone("");
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="sm"
      className="!max-h-[90vh] !w-[95%] overflow-hidden !p-0 sm:!max-h-[85vh] sm:!w-[90%] md:!w-[547px]"
    >
      <Modal.Header>
        <div className="mb-2 border-b border-slate-300 py-2">
          <div className="my-1 text-[20px] font-bold">Kristin Watson</div>
          <div className="my-1 text-[14px] font-medium">Frontend Developer</div>
          <div className="text-[13px] text-[#007BFF]">kristinwatson@gamil.com</div>
          <div className="mb-2 text-[#888DA8]">5 Year of Experience in this Field</div>
        </div>
      </Modal.Header>

      <Modal.Body className="no-scrollbar h-full overflow-y-auto rounded-lg bg-white !p-1 sm:p-4 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="font-semibold">Date*</label>
              <DatePicker
                oneTap
                value={date}
                onChange={(value) => {
                  setDate(value);
                  validateField("date", value);
                }}
                placeholder="Select date"
                shouldDisableDate={(d) => d < new Date().setHours(0, 0, 0, 0)}
                className="mt-1 w-full"
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="flex-1">
              <label className="font-semibold">Start time*</label>
              <Input
                type="time"
                value={startTime}
                onChange={(value) => {
                  setStartTime(value);
                  validateField("startTime", value);
                }}
                placeholder="Start time"
                className="mt-1 w-full"
              />
              {errors.startTime && <p className="text-sm text-red-500">{errors.startTime}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <label className="font-semibold">Time zone*</label>
              <SelectPicker
                data={timeZones}
                value={timeZone}
                onChange={(value) => {
                  setTimeZone(value);
                  validateField("timeZone", value);
                }}
                placeholder="Time zone"
                className="mt-1 w-full"
                searchable={false}
              />
              {errors.timeZone && <p className="text-sm text-red-500">{errors.timeZone}</p>}
            </div>
          </div>

          <div className="w-full">
            <label className="font-semibold">Interview address*</label>
            <Input
              as="textarea"
              value={address}
              onChange={(value) => {
                setAddress(value);
                validateField("address", value);
              }}
              placeholder="Interview address"
              className="mt-1 w-full"
              rows={4}
            />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <div className="my-4">
          <button
            onClick={onClose}
            className="text-primary border-primary w-full rounded border px-4 py-1.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Close
          </button>
          <button
            onClick={handleSend}
            className="bg-primary hover:text-primary hover:border-primary mt-5 w-full rounded-sm px-3 py-2 text-[13px] text-white hover:border hover:bg-white sm:mx-2 sm:mt-0 sm:w-auto"
          >
            Send Interview
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default SetInterviewModal;
