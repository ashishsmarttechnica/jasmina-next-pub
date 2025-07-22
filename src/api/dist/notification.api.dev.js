"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNotifications = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getNotifications = function getNotifications(viewerId) {
  var page,
      limit,
      response,
      _args = arguments;
  return regeneratorRuntime.async(function getNotifications$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
          limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 5;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].get("/notification?viewerId=".concat(viewerId, "&page=").concat(page, "&limit=").concat(limit)));

        case 5:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          throw _context.t0;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

exports.getNotifications = getNotifications;