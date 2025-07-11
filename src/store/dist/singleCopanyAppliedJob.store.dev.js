"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = require("zustand");

var _middleware = require("zustand/middleware");

var useSingleCompanyAppliedJobStore = (0, _zustand.create)((0, _middleware.devtools)(function (set) {
  return {
    appliedJobs: [],
    selectedJob: null,
    pagination: null,
    setAppliedJobs: function setAppliedJobs(appliedJobs) {
      return set({
        appliedJobs: appliedJobs
      });
    },
    setSelectedJob: function setSelectedJob(selectedJob) {
      return set({
        selectedJob: selectedJob
      });
    },
    setPagination: function setPagination(pagination) {
      return set({
        pagination: pagination
      });
    }
  };
}));
var _default = useSingleCompanyAppliedJobStore;
exports["default"] = _default;