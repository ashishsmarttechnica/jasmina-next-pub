// components/form/PasswordField.js
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField = ({ label, name, value, onChange, show, toggle, error }) => (
  <div className="mb-2.5">
    <label className="text-[15px] text-grayBlueText">{label}</label>
    <div className="relative mt-1">
      <input
        name={name}
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="border border-grayBlueText/[40%] px-3 py-[7px] rounded-xl w-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent hover:border-primary hover:bg-primary/5 active:bg-primary/10"
      />
      <div className="absolute end-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={toggle}>
        {show ? <FiEye className="text-[18px] sm:text-[20px]" /> : <FiEyeOff className="text-[18px] sm:text-[20px] text-gray-500" />}
      </div>
    </div>
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

export default PasswordField;
