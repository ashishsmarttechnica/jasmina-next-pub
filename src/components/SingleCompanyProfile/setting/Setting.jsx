"use client";
import useAuthStore from "@/store/auth.store";
import { useState } from "react";
import PasswordResetModal from "../../../modal/passwordReset/PasswordResetModal";

const Setting = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { user } = useAuthStore();

  const handleResentPassword = () => {
    setIsPasswordModalOpen(true);
  };
  return (
    <div className="space-y-2">
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block" onClick={() => handleResentPassword()}>
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Change Password</p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Preference</p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Billing Info</p>
        </div>
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-sm border-b border-gray-100 bg-white px-5 py-4 hover:bg-gray-50">
        <div className="block">
          <h3 className="text-[14px] font-medium"></h3>
          <p className="text-[16px] font-medium">Terms and Conditions</p>
        </div>
      </div>
      <PasswordResetModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userData={user}
      />
    </div>
  );
};

export default Setting;
