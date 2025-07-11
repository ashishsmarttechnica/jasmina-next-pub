"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.purchasePlan = void 0;

var _axios = require("./axios");

var purchasePlan = function purchasePlan(data) {
  var response;
  return regeneratorRuntime.async(function purchasePlan$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios.axiosInstance.post("/purchase-plan", data));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.purchasePlan = purchasePlan;