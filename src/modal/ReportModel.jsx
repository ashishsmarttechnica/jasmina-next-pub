import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import capitalize from "../lib/capitalize";

function ReportModel({ isOpen, onClose  }) {

  const userType = capitalize(Cookies.get("userRole"));
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/[40%] bg-opacity-30 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="no-scrollbar overflow-y-auto bg-white !max-h-[90vh] !w-[95%] overflow-hidden rounded-[10px]  sm:!w-[90%] md:!w-[545px] relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="h-full overflow-y-auto !px-6 sm:px-4 md:px-6 ">
              <div className="mb-4 flex items-start gap-3">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                  <IoClose className="text-[28px] text-black" />
                </button>

                <div className="w-full">
                  <div className="flex flex-col  text-center max-w-[284px] mt-4 mx-auto mb-4">
                    <span className="text-[17px] text-black font-medium">
                      {userType === "User" ? "Report This User" : "Report This Company"}
                    </span>
                    <p className="text-[15px] font-normal text-[#888DA8]">
                      Your report is confidential and helps us keep Jasmina safe.
                    </p>
                  </div>

                  <p className="text-[16px] font-medium text-black mb-[5px]">
                    Choose Reason
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {[
                      "Spam / Advertising",
                      "Harassment / Bullying",
                      userType === "user" ? "Fake Profile" : "Fake Company",
                      "Inappropriate Content",
                      "Other",
                    ].map((reason, index) => (
                      <label
                        key={index}
                        className="flex gap-2 items-center font-normal text-[14px] text-[#888DA8]"
                      >
                        <input
                          type="radio"
                          name="reason"
                          value={reason}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400 peer-checked:bg-green-700 flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-700 rounded-full peer-checked:visible invisible" />
                        </div>
                        {reason}
                      </label>
                    ))}

                    <p className="text-[16px] pt-4 font-medium text-black">
                      Tell us more
                    </p>

                    <textarea
                      placeholder="Tell us more"
                      className="w-full pl-6 outline-none bg-[#EDF2F6] h-[158px] p-2 border-none rounded-[6px] text-[14px] text-[#888DA8]"
                      rows={4}
                    ></textarea>

                    <div className="flex justify-center items-center w-full pt-2">
                      <button
                        className="bg-[#0F8200] px-6 py-2 text-white rounded-md transition hover:bg-[#0e7400]"
                        onClick={onClose}
                      >
                        Submit Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ReportModel;