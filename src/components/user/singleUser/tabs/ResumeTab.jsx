"use client";

import getImg from "@/lib/getImg";
import { useState } from "react";

const ResumeTab = ({ resume }) => {
  const [isLoading, setIsLoading] = useState(false);

  // If resume is missing or empty
  if (!resume || (typeof resume === "string" && resume.trim() === "")) {
    return (
      <div className="p-2 sm:p-4">
        <div className="px-2 sm:px-[30px]">
          <p className="text-sm text-gray-500 sm:text-base">No resume document available.</p>
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
      return `https://docs.google.com/viewer?url=${encodeURIComponent(absoluteUrl)}&embedded=false`;
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
      <div className="p-2 sm:p-4">
        <div className="px-2 sm:px-[30px]">
          <div className="space-y-4">
            <div className="border-grayBlueText rounded-lg border p-2 sm:p-3">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center sm:gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600 sm:text-sm">{getFileTypeLabel()}</span>
                </div>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                  <button
                    className="bg-primary hover:bg-primary/90 w-full rounded px-3 py-1.5 text-xs text-white disabled:opacity-50 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                    onClick={handleView}
                    disabled={isLoading}
                  >
                    {isLoading ? "Opening..." : "View"}
                  </button>
                  <a
                    href={fileUrl}
                    download={fileName}
                    className="w-full rounded bg-gray-200 px-3 py-1.5 text-center text-xs text-gray-700 hover:bg-gray-300 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
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
