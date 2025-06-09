"use client";
import InputField from "@/common/InputField";

const NewPasswordStep = ({
  newPassword,
  confirmPassword,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}) => {
  return (
    <form className="mt-7.5" onSubmit={onSubmit}>
      <InputField
        label="New Password"
        name="newPassword"
        type="password"
        value={newPassword}
        onChange={onNewPasswordChange}
        autoComplete="new-password"
      />
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
        autoComplete="new-password"
      />
      <button type="submit" className="btn-fill mt-4">
        Submit New Password
      </button>
    </form>
  );
};

export default NewPasswordStep;
