"use client";
import { useSingleJob } from "@/hooks/job/useGetJobs";
import { useEffect } from "react";
import { Modal } from "rsuite";

const ViewJobModal = ({ isOpen, onClose, jobId }) => {
  const { data: jobData, isLoading, isError, error } = useSingleJob(jobId);

  useEffect(() => {
    if (!isOpen) {
      // Reset any state when modal closes
    }
  }, [isOpen]);

  if (isLoading) {
    return (
      <Modal open={isOpen} onClose={onClose} size="md">
        <Modal.Header>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-8 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading job details...</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (isError) {
    return (
      <Modal open={isOpen} onClose={onClose} size="md">
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-8 text-center">
            <p className="text-red-600">{error?.message || "Failed to load job details"}</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  if (!jobData?.data) {
    return (
      <Modal open={isOpen} onClose={onClose} size="md">
        <Modal.Header>
          <Modal.Title>Job Not Found</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="py-8 text-center">
            <p className="text-gray-600">Job details not found</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const job = jobData.data;

  // Helper function to check if a field has a valid value
  const hasValue = (value) => {
    return value && value !== "Not specified" && value.trim() !== "";
  };

  // Helper function to render a field only if it has a value
  const renderField = (label, value) => {
    if (!hasValue(value)) return null;
    return (
      <div className="flex justify-between border-b border-gray-100 py-2 last:border-b-0">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value}</span>
      </div>
    );
  };

  // Helper function to render a date field
  const renderDateField = (label, dateValue) => {
    if (!dateValue) return null;
    const formattedDate = new Date(dateValue).toLocaleDateString();
    return (
      <div className="flex justify-between border-b border-gray-100 py-2 last:border-b-0">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{formattedDate}</span>
      </div>
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          {/* Job Header */}
          <div className="border-b pb-4">
            <h2 className="mb-2 text-xl font-bold text-gray-900">{job.jobTitle}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {hasValue(job.jobLocation) && <span>• {job.jobLocation}</span>}
              {hasValue(job.contactEmail) && <span>• {job.contactEmail}</span>}
            </div>
          </div>

          {/* Job Information */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Job Information</h3>
              <div className="space-y-1 rounded bg-gray-50 p-4">
                {renderField("Employment Type", job.employeeType)}
                {renderField("Department", job.department)}
                {renderField("Seniority Level", job.seniorityLevel)}
                {renderField("Work Hours", job.workHours)}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Compensation & Timeline</h3>
              <div className="space-y-1 rounded bg-gray-50 p-4">
                {renderField("Salary Range", job.salaryRange)}
                {renderDateField("Posted Date", job.createdAt)}
                {renderDateField("Deadline", job.deadline)}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Contact Information</h3>
              <div className="space-y-1 rounded bg-gray-50 p-4">
                {renderField("Contact Number", job.contactNumber)}
                {renderField("Apply Via", job.applyVia)}
                {renderField("Career Website", job.careerWebsite)}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Requirements</h3>
              <div className="space-y-1 rounded bg-gray-50 p-4">
                {renderField("Education", job.education)}
                {renderField("Experience", job.experience)}
                {renderField("Gender Preference", job.genderPrefereance)}
              </div>
            </div>
          </div>

          {/* Job Description */}
          {hasValue(job.description) && (
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Job Description</h3>
              <div className="rounded bg-gray-50 p-4">
                <div className="leading-relaxed text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: job.description }} />
                </div>
              </div>
            </div>
          )}

          {/* Responsibilities */}
          {hasValue(job.responsibilities) && (
            <div>
              <h3 className="mb-3 font-semibold text-gray-900">Responsibilities</h3>
              <div className="rounded bg-gray-50 p-4">
                <div className="leading-relaxed text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
                </div>
              </div>
            </div>
          )}

          {/* Skills and Tags */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {job.requiredSkills && job.requiredSkills.length > 0 && (
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Required Skills</h3>
                <div className="rounded bg-gray-50 p-4">
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {job.jobTags && job.jobTags.length > 0 && (
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Job Tags</h3>
                <div className="rounded bg-gray-50 p-4">
                  <div className="flex flex-wrap gap-2">
                    {job.jobTags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded bg-green-100 px-2 py-1 text-sm text-green-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {job.requiredLanguages && job.requiredLanguages.length > 0 && (
              <div>
                <h3 className="mb-3 font-semibold text-gray-900">Required Languages</h3>
                <div className="rounded bg-gray-50 p-4">
                  <div className="flex flex-wrap gap-2">
                    {job.requiredLanguages.map((language, index) => (
                      <span
                        key={index}
                        className="rounded bg-purple-100 px-2 py-1 text-sm text-purple-800"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={onClose}
          className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
        >
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewJobModal;
