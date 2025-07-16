"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCompanyConnectionsStore = exports["default"] = void 0;

var _zustand = require("zustand");

var _middleware = require("zustand/middleware");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useConnectionsStore = (0, _zustand.create)((0, _middleware.devtools)(function (set) {
  return {
    connections: [],
    pagination: null,
    hasMore: true,
    setConnections: function setConnections(connections) {
      return set({
        connections: connections
      });
    },
    setPagination: function setPagination(pagination) {
      return set({
        pagination: pagination
      });
    },
    setHasMore: function setHasMore(hasMore) {
      return set({
        hasMore: hasMore
      });
    },
    // Add a new connection to the beginning of the list
    addConnection: function addConnection(newConnection) {
      return set(function (state) {
        return {
          connections: [newConnection].concat(_toConsumableArray(state.connections))
        };
      });
    },
    // Remove a connection
    removeConnection: function removeConnection(connectionId) {
      return set(function (state) {
        return {
          connections: state.connections.filter(function (conn) {
            return conn.connectionId !== connectionId;
          })
        };
      });
    },
    // Reset store
    resetConnections: function resetConnections() {
      return set({
        connections: [],
        pagination: null,
        hasMore: true
      });
    }
  };
}, {
  name: "ConnectionsStore"
}));
var _default = useConnectionsStore;
exports["default"] = _default;
var useCompanyConnectionsStore = (0, _zustand.create)((0, _middleware.devtools)(function (set) {
  return {
    connections: [],
    pagination: null,
    hasMore: true,
    setConnections: function setConnections(connections) {
      return set({
        connections: connections
      });
    },
    setPagination: function setPagination(pagination) {
      return set({
        pagination: pagination
      });
    },
    setHasMore: function setHasMore(hasMore) {
      return set({
        hasMore: hasMore
      });
    },
    // Add a new connection to the beginning of the list
    addConnection: function addConnection(newConnection) {
      return set(function (state) {
        return {
          connections: [newConnection].concat(_toConsumableArray(state.connections))
        };
      });
    },
    // Remove a connection
    removeConnection: function removeConnection(connectionId) {
      return set(function (state) {
        return {
          connections: state.connections.filter(function (conn) {
            return conn.connectionId !== connectionId;
          })
        };
      });
    },
    // Reset store  
    resetConnections: function resetConnections() {
      return set({
        connections: [],
        pagination: null,
        hasMore: true
      });
    }
  };
}, {
  name: "CompanyConnectionsStore"
}));
exports.useCompanyConnectionsStore = useCompanyConnectionsStore;