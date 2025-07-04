// Utility functions for SingleApplicationComponent

export const getStatusColor = (status) => {
  switch (status) {
    case "New":
    case "0":
      return "bg-blue-100 text-blue-800";
    case "Reviewed":
    case "1":
      return "bg-purple-100 text-purple-800";
    case "Interviewed":
    case "2":
      return "bg-yellow-100 text-yellow-800";
    case "Approved":
    case "3":
      return "bg-green-100 text-green-800";
    case "Rejected":
    case "4":
      return "bg-red-100 text-red-800";
    case "Hired":
    case "5":
      return "bg-teal-100 text-teal-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, ", ");
};

// Convert numeric status to readable text for job applications
export const getStatusText = (status) => {
  switch (status) {
    case "0":
      return "New";
    case "1":
      return "Reviewed";
    case "2":
      return "Interviewed";
    case "3":
      return "Approved";
    case "4":
      return "Rejected";
    case "5":
      return "Hired";
    default:
      return status || "New";
  }
};

// Get job status label (different from application status)
export const getJobStatusLabel = (status) => {
  if (typeof status === "number") {
    return status === 0 ? "Open" : status === 1 ? "Closed" : "In Progress";
  }
  return status || "Unknown";
};
