// components/form/InputField.js
import React from "react";

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  isForgot,
}) => (
  <div className={` ${!isForgot ? "mb-2.5" : ""} `}>
    <label className="text-[15px] text-grayBlueText">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="border border-grayBlueText/[40%] px-3 py-[7px] rounded-xl w-full mt-1 transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent hover:border-primary hover:bg-primary/5 active:bg-primary/10"
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
);

export default InputField;
