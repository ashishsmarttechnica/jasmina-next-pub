"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOthersUserConnections = exports.getOthersCompanyConnections = exports.getOthersConnection = exports.removeConnection = exports.rejectConnection = exports.acceptConnection = exports.getCompanyConnections = exports.getConnections = exports.createConnection = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createConnection = function createConnection(data) {
  var response;
  return regeneratorRuntime.async(function createConnection$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("/create/connection", data));

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

exports.createConnection = createConnection;

var getConnections = function getConnections(_ref) {
  var userId, userType, _ref$page, page, _ref$limit, limit, _ref$connectionType, connectionType, res;

  return regeneratorRuntime.async(function getConnections$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          userId = _ref.userId, userType = _ref.userType, _ref$page = _ref.page, page = _ref$page === void 0 ? 1 : _ref$page, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 10 : _ref$limit, _ref$connectionType = _ref.connectionType, connectionType = _ref$connectionType === void 0 ? "User" : _ref$connectionType;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/connection?userId=".concat(userId, "&userType=").concat(userType, "&page=").concat(page, "&limit=").concat(limit, "&filterType=").concat(connectionType)));

        case 3:
          res = _context2.sent;
          return _context2.abrupt("return", res.data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getConnections = getConnections;

var getCompanyConnections = function getCompanyConnections(_ref2) {
  var userId, userType, _ref2$page, page, _ref2$limit, limit, _ref2$connectionType, connectionType, res;

  return regeneratorRuntime.async(function getCompanyConnections$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = _ref2.userId, userType = _ref2.userType, _ref2$page = _ref2.page, page = _ref2$page === void 0 ? 1 : _ref2$page, _ref2$limit = _ref2.limit, limit = _ref2$limit === void 0 ? 10 : _ref2$limit, _ref2$connectionType = _ref2.connectionType, connectionType = _ref2$connectionType === void 0 ? "Company" : _ref2$connectionType;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/connection?userId=".concat(userId, "&userType=").concat(userType, "&page=").concat(page, "&limit=").concat(limit, "&filterType=").concat(connectionType)));

        case 3:
          res = _context3.sent;
          return _context3.abrupt("return", res.data);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.getCompanyConnections = getCompanyConnections;

var acceptConnection = function acceptConnection(data) {
  var res;
  return regeneratorRuntime.async(function acceptConnection$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("accept/connection", data));

        case 3:
          res = _context4.sent;
          return _context4.abrupt("return", res.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          throw _context4.t0;

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.acceptConnection = acceptConnection;

var rejectConnection = function rejectConnection(data) {
  var res;
  return regeneratorRuntime.async(function rejectConnection$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("reject/connection", data));

        case 3:
          res = _context5.sent;
          return _context5.abrupt("return", res.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          throw _context5.t0;

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.rejectConnection = rejectConnection;

var removeConnection = function removeConnection(data) {
  var res;
  return regeneratorRuntime.async(function removeConnection$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("remove/connection", data));

        case 3:
          res = _context6.sent;
          return _context6.abrupt("return", res.data);

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          throw _context6.t0;

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.removeConnection = removeConnection;

var getOthersConnection = function getOthersConnection(_ref3) {
  var viewerId, profileId, res;
  return regeneratorRuntime.async(function getOthersConnection$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          viewerId = _ref3.viewerId, profileId = _ref3.profileId;
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/others/connection?viewerId=".concat(viewerId, "&profileId=").concat(profileId)));

        case 4:
          res = _context7.sent;
          return _context7.abrupt("return", res.data);

        case 8:
          _context7.prev = 8;
          _context7.t0 = _context7["catch"](1);
          throw _context7.t0;

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getOthersConnection = getOthersConnection;

var getOthersCompanyConnections = function getOthersCompanyConnections(_ref4) {
  var userId, profileId, userType, _ref4$filterType, filterType, _ref4$page, page, _ref4$limit, limit, res;

  return regeneratorRuntime.async(function getOthersCompanyConnections$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          userId = _ref4.userId, profileId = _ref4.profileId, userType = _ref4.userType, _ref4$filterType = _ref4.filterType, filterType = _ref4$filterType === void 0 ? "Company" : _ref4$filterType, _ref4$page = _ref4.page, page = _ref4$page === void 0 ? 1 : _ref4$page, _ref4$limit = _ref4.limit, limit = _ref4$limit === void 0 ? 10 : _ref4$limit;
          _context8.prev = 1;
          _context8.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/others/connection?userType=".concat(userType, "&filterType=").concat(filterType, "&page=").concat(page, "&limit=").concat(limit, "&userId=").concat(userId, "&profileId=").concat(profileId)));

        case 4:
          res = _context8.sent;
          return _context8.abrupt("return", res.data);

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](1);
          throw _context8.t0;

        case 11:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getOthersCompanyConnections = getOthersCompanyConnections;

var getOthersUserConnections = function getOthersUserConnections(_ref5) {
  var userId, profileId, userType, _ref5$filterType, filterType, _ref5$page, page, _ref5$limit, limit, res;

  return regeneratorRuntime.async(function getOthersUserConnections$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          userId = _ref5.userId, profileId = _ref5.profileId, userType = _ref5.userType, _ref5$filterType = _ref5.filterType, filterType = _ref5$filterType === void 0 ? "User" : _ref5$filterType, _ref5$page = _ref5.page, page = _ref5$page === void 0 ? 1 : _ref5$page, _ref5$limit = _ref5.limit, limit = _ref5$limit === void 0 ? 10 : _ref5$limit;
          _context9.prev = 1;
          _context9.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/others/connection?userType=".concat(userType, "&filterType=").concat(filterType, "&page=").concat(page, "&limit=").concat(limit, "&userId=").concat(userId, "&profileId=").concat(profileId)));

        case 4:
          res = _context9.sent;
          return _context9.abrupt("return", res.data);

        case 8:
          _context9.prev = 8;
          _context9.t0 = _context9["catch"](1);
          throw _context9.t0;

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getOthersUserConnections = getOthersUserConnections;