"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePreviousPlans = void 0;

var _membership = require("@/api/membership.api");

var _reactQuery = require("@tanstack/react-query");

var usePreviousPlans = function usePreviousPlans(companyId) {
  return (0, _reactQuery.useQuery)({
    queryKey: ["previousPlans", companyId],
    queryFn: function queryFn() {
      return (0, _membership.getPreviousPlans)(companyId);
    },
    enabled: !!companyId
  });
};

exports.usePreviousPlans = usePreviousPlans;