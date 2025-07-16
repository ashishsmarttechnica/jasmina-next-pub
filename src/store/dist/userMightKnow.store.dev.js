"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCompanySuggestionsStore = exports["default"] = void 0;

var _zustand = require("zustand");

var _middleware = require("zustand/middleware");

var useUserMightKnowStore = (0, _zustand.create)((0, _middleware.devtools)(function (set) {
  return {
    suggestions: [],
    loading: true,
    error: null,
    setSuggestions: function setSuggestions(suggestions) {
      return set({
        suggestions: suggestions
      });
    },
    setLoading: function setLoading(loading) {
      return set({
        loading: loading
      });
    },
    setError: function setError(error) {
      return set({
        error: error
      });
    },
    // Reset store
    resetStore: function resetStore() {
      return set({
        suggestions: [],
        loading: true,
        error: null
      });
    }
  };
}, {
  name: "UserMightKnowStore"
}));
var _default = useUserMightKnowStore;
exports["default"] = _default;
var useCompanySuggestionsStore = (0, _zustand.create)((0, _middleware.devtools)(function (set) {
  return {
    suggestions: [],
    loading: true,
    error: null,
    setSuggestions: function setSuggestions(suggestions) {
      return set({
        suggestions: suggestions
      });
    },
    setLoading: function setLoading(loading) {
      return set({
        loading: loading
      });
    },
    setError: function setError(error) {
      return set({
        error: error
      });
    },
    resetStore: function resetStore() {
      return set({
        suggestions: [],
        loading: true,
        error: null
      });
    }
  };
}, {
  name: "CompanySuggestionsStore"
}));
exports.useCompanySuggestionsStore = useCompanySuggestionsStore;