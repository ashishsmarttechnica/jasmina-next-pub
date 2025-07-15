"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _job = require("@/api/job.api");

var _zustand = require("zustand");

var useAppliedJobStore = (0, _zustand.create)(function (set) {
  return {
    appliedJobs: [],
    isLoading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      pageSize: 10,
      total: 0
    },
    setAppliedJobs: function setAppliedJobs(appliedJobs) {
      return set({
        appliedJobs: appliedJobs
      });
    },
    setLoading: function setLoading(isLoading) {
      return set({
        isLoading: isLoading
      });
    },
    setError: function setError(error) {
      return set({
        error: error
      });
    },
    setPagination: function setPagination(pagination) {
      return set({
        pagination: pagination
      });
    },
    getAppliedJobs: function getAppliedJobs(_ref) {
      var userId, _ref$page, page, _ref$limit, limit, onSuccess, onError, response, appliedJobsData;

      return regeneratorRuntime.async(function getAppliedJobs$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = _ref.userId, _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, onSuccess = _ref.onSuccess, onError = _ref.onError;
              _context.prev = 1;
              set({
                isLoading: true,
                error: null
              });
              _context.next = 5;
              return regeneratorRuntime.awrap((0, _job.getAppliedJobs)({
                userId: userId,
                page: page,
                limit: limit
              }));

            case 5:
              response = _context.sent;

              if (response.success && response.data) {
                // Extract jobs from appliedJobs array
                appliedJobsData = response.data.appliedJobs || [];
                set({
                  appliedJobs: appliedJobsData,
                  isLoading: false,
                  pagination: {
                    currentPage: response.data.currentPage || 1,
                    totalPages: response.data.totalPages || 1,
                    pageSize: response.data.pageSize || 10,
                    total: response.data.total || 0
                  }
                });
              } else {
                set({
                  appliedJobs: [],
                  isLoading: false,
                  pagination: {
                    currentPage: 1,
                    totalPages: 1,
                    pageSize: 10,
                    total: 0
                  }
                });
              }

              if (onSuccess) onSuccess(response);
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](1);
              set({
                error: _context.t0,
                isLoading: false
              });
              if (onError) onError(_context.t0);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 10]]);
    },
    clearAppliedJobs: function clearAppliedJobs() {
      return set({
        appliedJobs: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          pageSize: 10,
          total: 0
        }
      });
    }
  };
});
var _default = useAppliedJobStore;
exports["default"] = _default;