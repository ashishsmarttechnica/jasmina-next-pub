export function getRelativeTime(date) {
  const now = new Date();
  const target = new Date(date);
  const diffMs = now - target;

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  return "just now";
}

/**
 * Calculate the duration between two dates
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date (can be "Present" for current date)
 * @returns {string} Formatted duration string
 */
export const calculateDateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = endDate === "Present" ? new Date() : new Date(endDate);

  // More accurate date difference calculation
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  // Adjust for day of month
  if (end.getDate() < start.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  const yearText = years === 1 ? "year" : "years";
  const monthText = months === 1 ? "month" : "months";

  let durationText = "";
  if (years > 0 && months > 0) {
    durationText = `(${years} ${yearText} ${months} ${monthText})`;
  } else if (years > 0) {
    durationText = `(${years} ${yearText})`;
  } else if (months > 0) {
    durationText = `(${months} ${monthText})`;
  } else {
    durationText = "(Less than 1 month)";
  }

  return durationText;
};

/**
 * Format date range with duration
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date (can be "Present" for current date)
 * @returns {string} Formatted date range with duration
 */
export const formatDateRangeWithDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "";

  const start = new Date(startDate);
  const end = endDate === "Present" ? new Date() : new Date(endDate);
  const duration = calculateDateDuration(startDate, endDate);

  return `${start.toLocaleDateString()} - ${endDate === "Present" ? "Present" : end.toLocaleDateString()} ${duration}`;
};
