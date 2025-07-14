"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.purchasePlan = exports.getPreviousPlans = exports.getAllMemberships = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllMemberships = function getAllMemberships() {
  var res;
  return regeneratorRuntime.async(function getAllMemberships$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/all/membership"));

        case 2:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllMemberships = getAllMemberships;

var getPreviousPlans = function getPreviousPlans(companyId) {
  var res;
  return regeneratorRuntime.async(function getPreviousPlans$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/previous-plan/".concat(companyId)));

        case 2:
          res = _context2.sent;
          return _context2.abrupt("return", res.data);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getPreviousPlans = getPreviousPlans;

var purchasePlan = function purchasePlan(purchaseData) {
  var res;
  return regeneratorRuntime.async(function purchasePlan$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("/purchase-plan", purchaseData));

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

exports.purchasePlan = purchasePlan;