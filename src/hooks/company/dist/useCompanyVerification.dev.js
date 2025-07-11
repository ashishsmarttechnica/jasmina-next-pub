"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.useCompanyVerification = void 0;

var _company = require("@/api/company.api");

var _reactQuery = require("@tanstack/react-query");

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useCompanyVerification = function useCompanyVerification() {
  var companyId = _jsCookie["default"].get("userId");

  return (0, _reactQuery.useQuery)({
    queryKey: ["companyVerification", companyId],
    queryFn: function queryFn() {
      return (0, _company.checkCompanyVerification)(companyId);
    },
    enabled: !!companyId,
    retry: 1,
    refetchOnWindowFocus: false
  });
};

exports.useCompanyVerification = useCompanyVerification;
var _default = useCompanyVerification;
exports["default"] = _default;