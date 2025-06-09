import { useState } from "react";

const useSalaryInfoValidation = () => {
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};

    if (!formData.salaryRange) {
      newErrors.salaryRange = "Salary range is required";
    } else {
      // Check if the salary format is correct based on the pattern
      const isRangeFormat = /^\d+\s*-\s*\d+\s+[A-Za-z]+$/.test(formData.salaryRange); // e.g., 5000 - 8000 INR
      const isLpaFormat = /^\d+\s*-\s*\d+\s+LPA$/i.test(formData.salaryRange); // e.g., 5-7 LPA

      if (!isRangeFormat && !isLpaFormat) {
        newErrors.salaryRange =
          "Please enter a valid salary format (e.g., 5000 - 8000 INR or 5-7 LPA)";
      }
    }

    if (!formData.workHoursFrom) {
      newErrors.workHoursFrom = "Start time is required";
    }

    if (!formData.workHoursTo) {
      newErrors.workHoursTo = "End time is required";
    }

    // Validate that end time is after start time
    if (formData.workHoursFrom && formData.workHoursTo) {
      // Convert time strings to comparable values (assuming format is HH:MM AM/PM)
      const convertTimeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        return hours * 60 + minutes;
      };

      const startMinutes = convertTimeToMinutes(formData.workHoursFrom);
      const endMinutes = convertTimeToMinutes(formData.workHoursTo);

      if (startMinutes === endMinutes) {
        newErrors.workHoursTo = "Start and end time cannot be the same";
      } else if (startMinutes > endMinutes) {
        newErrors.workHoursTo = "End time must be after start time";
      }
    }

    if (!formData.applicationDeadline) {
      newErrors.applicationDeadline = "Application deadline is required";
    } else {
      const deadlineDate = new Date(formData.applicationDeadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.applicationDeadline = "Deadline cannot be in the past";
      }
    }

    if (!formData.genderPreference) {
      newErrors.genderPreference = "Gender preference is required";
    }

    if (!formData.education?.trim()) {
      newErrors.education = "Education is required";
    }

    if (!formData.experience) {
      newErrors.experience = "Experience is required";
    }

    if (!formData.applicants) {
      newErrors.applicants = "Number of applicants is required";
    } else {
      const applicantsNum = Number(formData.applicants);
      if (isNaN(applicantsNum)) {
        newErrors.applicants = "Please enter a valid number";
      } else if (applicantsNum <= 0) {
        newErrors.applicants = "Number of applicants must be at least 1";
      } else if (applicantsNum > 99) {
        newErrors.applicants = "Number of applicants cannot exceed 99";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (fieldName) => {
    setErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[fieldName];
      return updatedErrors;
    });
  };

  return {
    errors,
    setErrors,
    validateForm,
    clearError,
  };
};

export default useSalaryInfoValidation;
