import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  min,
  max,
  step,
  onInput,
  disabled,
  textarea = false,
  rows = 4,
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="text-grayBlueText text-[14px] block mb-1" htmlFor={name}>
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          placeholder={placeholder}
          disabled={disabled}
          className="border border-lightGray/75 p-2 rounded w-full resize-none transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent hover:border-primary hover:bg-primary/5 active:bg-primary/10"
        />
      ) : (
        <input
          id={name}
          type={type}
          max={max}
          min={min}
          step={step}
          name={name}
          className="border border-lightGray/75 p-2 rounded w-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent hover:border-primary hover:bg-primary/5 active:bg-primary/10"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onInput={onInput}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
