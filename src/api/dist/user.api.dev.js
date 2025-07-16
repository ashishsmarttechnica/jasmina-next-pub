"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCompanySuggestions = exports.getUserSuggestions = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _capitalize = _interopRequireDefault(require("@/lib/capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getUserSuggestions = function getUserSuggestions(_ref) {
  var page, limit, userId, userType, response;
  return regeneratorRuntime.async(function getUserSuggestions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _ref.page, limit = _ref.limit;
          userId = _jsCookie["default"].get("userId");
          userType = (0, _capitalize["default"])(_jsCookie["default"].get("userRole"));
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].get("/people/suggestions/user?userId=".concat(userId, "&userType=").concat(userType, "&limit=").concat(limit)));

        case 6:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](3);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.getUserSuggestions = getUserSuggestions;

var getCompanySuggestions = function getCompanySuggestions(_ref2) {
  var page, limit, userId, userType, response;
  return regeneratorRuntime.async(function getCompanySuggestions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          page = _ref2.page, limit = _ref2.limit;
          userId = _jsCookie["default"].get("userId");
          userType = (0, _capitalize["default"])(_jsCookie["default"].get("userRole"));
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].get("/people/suggestions/company?userId=".concat(userId, "&userType=").concat(userType, "&limit=").concat(limit)));

        case 6:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          throw _context2.t0;

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 10]]);
};

exports.getCompanySuggestions = getCompanySuggestions;