"use client";
import RadioGroup from "@/common/RadioGroup";
import RichTextEditor from "@/common/RichTextEditor";
import ReusableForm from "@/components/form/ReusableForm";
import useRequirementsValidation from "@/hooks/validation/job/useRequirementsValidation";
import { useCallback, useEffect } from "react";

const HowToApply = ({ formData, onChange, errors: parentErrors, onNext, onBack }) => {
  const { errors, setErrors, validateForm, clearError } = useRequirementsValidation();

  // Merge parent errors with local errors for display
  useEffect(() => {
    if (parentErrors) {
      setErrors((prev) => ({ ...prev, ...parentErrors }));
    }
  }, [parentErrors, setErrors]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Validate form before proceeding
      if (!validateForm(formData)) {
        return;
      }

      onNext();
    },
    [onNext, validateForm, formData]
  );

  const handleContentChange = useCallback(
    (content) => {
      onChange({ description: content });

      // Clear error when content is changed and not empty
      if (content.trim() && errors.description) {
        clearError("description");
      }
    },
    [onChange, errors.description, clearError]
  );

  const handleSeniorityChange = useCallback(
    (value) => {
      onChange({ seniorityLevel: value });
    },
    [onChange]
  );

  const seniorityOptions = [
    { label: "Intern", value: "intern" },
    { label: "Entry Level", value: "entry-level" },
    { label: "Associate / Mid-Level", value: "mid-level" },
    { label: "Senior", value: "senior" },
    { label: "Lead / Manager", value: "lead-manager" },
    { label: "Director / VP", value: "director-vp" },
    { label: "C-Level / Executive", value: "c-level" },
  ];

  return (
    <ReusableForm
      title={"Add Job Details"}
      maxWidth="max-w-[698px]"
      subtitle={"Fill in the details below and find the right candidate."}
    >
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <div className="text-grayBlueText ms-1 mb-1.5 text-sm">Description</div>
          <RichTextEditor
            defaultValue={formData.description}
            onChange={handleContentChange}
            height="300px"
            className="job-application-editor"
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
        </div>

        <RadioGroup
          title="Seniority Level"
          options={seniorityOptions}
          name="seniority"
          defaultValue={formData.seniorityLevel}
          onChange={handleSeniorityChange}
          className="mt-6"
        />
        {errors.seniorityLevel && <p className="text-sm text-red-500">{errors.seniorityLevel}</p>}

        <div className="flex gap-4.5">
          <button type="button" className="btn-white-fill" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn-fill">
            Next
          </button>
        </div>
      </form>
    </ReusableForm>
  );
};

export default HowToApply;
