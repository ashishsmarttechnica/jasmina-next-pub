"use client";

import React, { useState } from "react";
import getImg from "@/lib/getImg";

const ResumeTab = ({ resume }) => {
  const [isLoading, setIsLoading] = useState(false);

  // If resume is missing or empty
  if (!resume || (typeof resume === "string" && resume.trim() === "")) {
    return (
      <div className="p-4">
        <div className="px-[30px]">
          <p className="text-gray-500">No resume document available.</p>
        </div>
      </div>
    );
  }

  // If resume is a string (file URL or file name)
  if (typeof resume === "string") {
    const fileName = resume.split("/").pop();
    const fileUrl = getImg(resume);

    // Get file extension
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    // Function to get Google Docs viewer URL
    const getGoogleDocsViewerUrl = (url) => {
      // Make sure URL is absolute
      let absoluteUrl = url;
      if (!url.startsWith("http")) {
        // For relative URLs, we need to convert to absolute
        const baseUrl = window.location.origin;
        absoluteUrl = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
      }

      // Use Google Docs viewer for all document types
      return `https://docs.google.com/viewer?url=${encodeURIComponent(
        absoluteUrl
      )}&embedded=false`;
    };

    const handleView = () => {
      setIsLoading(true);
      try {
        // Get Google Docs viewer URL
        const viewerUrl = getGoogleDocsViewerUrl(fileUrl);

        // Open in new tab
        window.open(viewerUrl, "_blank");
      } catch (error) {
        console.error("Error opening document:", error);
        // Fallback to direct URL
        window.open(fileUrl, "_blank");
      } finally {
        setIsLoading(false);
      }
    };

    // Get file type icon or label
    const getFileTypeLabel = () => {
      switch (fileExtension) {
        case "pdf":
          return "PDF Document";
        case "doc":
        case "docx":
          return "Word Document";
        case "xls":
        case "xlsx":
          return "Excel Document";
        case "ppt":
        case "pptx":
          return "PowerPoint Document";
        case "txt":
          return "Text Document";
        case "csv":
          return "CSV File";
        default:
          return "Document";
      }
    };

    return (
      <div className="p-4">
        <div className="px-[30px]">
          <div className="space-y-4">
            <div className="border border-grayBlueText rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {getFileTypeLabel()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
                    onClick={handleView}
                    disabled={isLoading}
                  >
                    {isLoading ? "Opening..." : "View"}
                  </button>
                  <a
                    href={fileUrl}
                    download={fileName}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // (Optional) If you want to keep array/object support for future
  // ...existing array/object code here...

  // Fallback
  return null;
};

export default ResumeTab;
