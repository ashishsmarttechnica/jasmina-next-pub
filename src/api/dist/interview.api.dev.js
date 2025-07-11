"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllInterviews = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllInterviews = function getAllInterviews(_ref) {
  var _ref$page, page, _ref$limit, limit, _ref$status, status, response;

  return regeneratorRuntime.async(function getAllInterviews$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$status = _ref.status, status = _ref$status === void 0 ? 0 : _ref$status;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("/applied-interviews?page=".concat(page, "&limit=").concat(limit, "&status=").concat(status)));

        case 4:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          throw _context.t0;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getAllInterviews = getAllInterviews;