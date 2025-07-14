"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCompanyVerification = exports.getAllApplicants = exports.getCompanyAppliedJob = exports.getCompany = exports.updateCompanyProfile = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var updateCompanyProfile = function updateCompanyProfile(_ref) {
  var data, userId, res;
  return regeneratorRuntime.async(function updateCompanyProfile$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = _ref.data, userId = _ref.userId;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put("/update/company/?id=".concat(userId), data));

        case 3:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.updateCompanyProfile = updateCompanyProfile;

var getCompany = function getCompany(id) {
  var res;
  return regeneratorRuntime.async(function getCompany$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/company/profile/?id=".concat(id)));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // export const getAllCompanyPosts = async (page = 1, limit = 4) => {
//   const res = await axios.get(`user/home/page?page=${page}&limit=${limit}`);
//   return res.data;
// };
// export const getPostCompanyById = async (id) => {
//   const res = await axios.get(`user/home/page?id=${id}`);
//   return res.data;
// };
// export const createCompanyPost = async (data) => {
//   const res = await axios.post("/create/post", data);
//   return res.data;
// };


exports.getCompany = getCompany;

var getCompanyAppliedJob = function getCompanyAppliedJob(id) {
  var res;
  return regeneratorRuntime.async(function getCompanyAppliedJob$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/getcompany/job?id=".concat(id)));

        case 2:
          res = _context3.sent;
          return _context3.abrupt("return", res.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCompanyAppliedJob = getCompanyAppliedJob;

var getAllApplicants = function getAllApplicants(jobId) {
  var page,
      limit,
      status,
      res,
      _args4 = arguments;
  return regeneratorRuntime.async(function getAllApplicants$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          page = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 1;
          limit = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : 10;
          status = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : "all";
          _context4.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get("/job/applications?jobId=".concat(jobId, "&page=").concat(page, "&limit=").concat(limit)));

        case 5:
          res = _context4.sent;
          return _context4.abrupt("return", res.data);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.getAllApplicants = getAllApplicants;

var checkCompanyVerification = function checkCompanyVerification(companyId) {
  var response;
  return regeneratorRuntime.async(function checkCompanyVerification$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/isVerified?companyId=".concat(companyId)));

        case 2:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.checkCompanyVerification = checkCompanyVerification;