"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

import useForgotPassValidationForm from "@/hooks/validation/auth/useForgotPassValidationForm";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";
import NewPasswordStep from "./NewPasswordStep";


const ForgotPasswordForm = () => {
  const t = useTranslations("auth");
  const { errors, validateForm } = useForgotPassValidationForm();

  const [formData, setFormData] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1);
  const [cooldown, setCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  // Step 1: Email submit
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateForm({ email: formData.email })) return;
    setStep(2);
  };

  // OTP handlers
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.querySelectorAll("input")[index + 1];
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelectorAll("input")[index - 1];
      prevInput?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").trim();

    if (!/^\d{6}$/.test(pasteData)) {
      toast.error("Please paste a valid 6-digit OTP");
      return;
    }

    const otpArray = pasteData.split("");
    setOtp(otpArray);
    const lastInput = document.querySelectorAll("input")[5];
    lastInput?.focus();
  };

  const handleVerify = () => {
    const fullOtp = otp.join("").trim();

    if (fullOtp.length !== 6 || otp.includes("")) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
      toast.success("OTP Verified Successfully!");
      setShowNewPasswordForm(true);
      setStep(3);
    }, 1000);
  };

  const handleResendOtp = () => {
    if (!formData.email || cooldown > 0) return;
    setIsResending(true);

    setTimeout(() => {
      setCooldown(120);
      setIsResending(false);
      toast.success("OTP Resent!");
    }, 1000);
  };

  // Step 3: New password submit
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmPassword) {
      toast.error("Please fill both fields.");
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Password changed successfully!");
    // Reset form or redirect here if needed
  };

  return (
    <>
      {step === 1 && (
        <EmailStep
          email={formData.email}
          onEmailChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onSubmit={handleEmailSubmit}
          errors={errors}
          t={t}
        />
      )}

      {step === 2 && !showNewPasswordForm && (
        <OtpStep
          otp={otp}
          onOtpChange={handleOtpChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onVerify={handleVerify}
          onResendOtp={handleResendOtp}
          isResending={isResending}
          cooldown={cooldown}
          isPending={isPending}
          t={t}
        />
      )}

      {step === 3 && showNewPasswordForm && (
        <NewPasswordStep
          newPassword={formData.newPassword}
          confirmPassword={formData.confirmPassword}
          onNewPasswordChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          onConfirmPasswordChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          onSubmit={handleNewPasswordSubmit}
        />
      )}
    </>
  );
};

export default ForgotPasswordForm;
