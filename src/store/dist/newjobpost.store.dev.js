"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zustand = require("zustand");

var useNewJobPostStore = (0, _zustand.create)(function (set) {
  return {
    meassage: "",
    isLoading: false,
    isverified: false,
    setMeassage: function setMeassage(meassage) {
      return set({
        meassage: meassage
      });
    },
    setLoading: function setLoading(loading) {
      return set({
        isLoading: loading
      });
    },
    setIsverified: function setIsverified(isverified) {
      return set({
        isverified: isverified
      });
    }
  };
});
var _default = useNewJobPostStore;
exports["default"] = _default;