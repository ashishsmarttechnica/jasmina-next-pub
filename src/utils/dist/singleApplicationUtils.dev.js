"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobStatusLabel = exports.getStatusText = exports.formatDate = exports.getStatusColor = void 0;

// Utility functions for SingleApplicationComponent
var getStatusColor = function getStatusColor(status) {
  switch (status) {
    case "Interviewing":
    case "1":
      return "bg-purple-100 text-purple-800";

    case "Approved":
    case "2":
      return "bg-yellow-100 text-yellow-800";

    case "Rejected":
    case "3":
      return "bg-green-100 text-green-800";

    case "Hired":
    case "4":
      return "bg-red-100 text-red-800";

    case "Reviewed":
    case "5":
      return "bg-teal-100 text-teal-800";
    // case "Hired":
    // case "5":
    //   return "bg-teal-100 text-teal-800";

    default:
      return "bg-gray-100 text-gray-800";
  }
};

exports.getStatusColor = getStatusColor;

var formatDate = function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).replace(/ /g, ", ");
}; // Convert numeric status to readable text for job applications


exports.formatDate = formatDate;

var getStatusText = function getStatusText(status) {
  switch (status) {
    case "1":
      return "Interviewing";

    case "2":
      return "Approved";

    case "3":
      return "Rejected";

    case "4":
      return "Hired";

    case "5":
      return "Reviewed";

    default:
      return status || "Interviewing";
  }
}; // Get job status label (different from application status)


exports.getStatusText = getStatusText;

var getJobStatusLabel = function getJobStatusLabel(status) {
  if (typeof status === "number") {
    return status === 0 ? "Open" : status === 1 ? "Closed" : "In Progress";
  }

  return status || "Unknown";
};

exports.getJobStatusLabel = getJobStatusLabel;