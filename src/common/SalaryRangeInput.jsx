import InputField from "@/common/InputField";
import { useState } from "react";

const SalaryRangeInput = ({ onSalaryChange, initialValue = "" }) => {
  const [salaryRange, setSalaryRange] = useState(initialValue);
  const [formatType, setFormatType] = useState("range");

  const formats = [
    { id: "range", label: "Range" },
    { id: "lpa", label: "LPA Format" },
  ];

  const handleSalaryChange = (value) => {
    setSalaryRange(value);
    onSalaryChange(value);
  };

  const getPlaceholder = () => {
    return formatType === "range" ? "e.g., 5000 - 8000 INR" : "e.g., 5-7 LPA";
  };

  const handleFormatChange = (format) => {
    setFormatType(format);
    setSalaryRange("");
    onSalaryChange("");
  };

  return (
    <div className="mb-3">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-grayBlueText text-[15px] font-medium">Salary Range</label>

        <div className="flex items-center gap-3 text-sm">
          {formats.map((format) => (
            <div
              key={format.id}
              className={`cursor-pointer rounded-md px-3 py-1 transition-all ${
                formatType === format.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFormatChange(format.id)}
            >
              {format.label}
            </div>
          ))}
        </div>
      </div>

      <InputField
        type="text"
        value={salaryRange}
        onChange={(e) => handleSalaryChange(e.target.value)}
        placeholder={getPlaceholder()}
      />

      {formatType === "range" && (
        <p className="mt-1 text-xs text-gray-500">
          Format: Amount - Amount Currency (e.g., 5000 - 8000 INR)
        </p>
      )}
      {formatType === "lpa" && (
        <p className="mt-1 text-xs text-gray-500">Format: Number-Number LPA (e.g., 5-7 LPA)</p>
      )}
    </div>
  );
};

export default SalaryRangeInput;
