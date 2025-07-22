"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchSuggestions = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getSearchSuggestions = function getSearchSuggestions(_ref) {
  var query, _ref$limit, limit, _ref$page, page, userId, url, response;

  return regeneratorRuntime.async(function getSearchSuggestions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          query = _ref.query, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page, userId = _ref.userId;
          _context.prev = 1;
          url = "/search?query=".concat(encodeURIComponent(query), "&limit=").concat(limit, "&page=").concat(page);

          if (userId) {
            url += "&userId=".concat(encodeURIComponent(userId));
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(_axios["default"].get(url));

        case 6:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          throw _context.t0;

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.getSearchSuggestions = getSearchSuggestions;