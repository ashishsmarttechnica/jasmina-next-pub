"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _notification = require("@/api/notification.api");

var _zustand = require("zustand");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var useNotificationStore = (0, _zustand.create)(function (set, get) {
  return {
    notifications: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    setNotifications: function setNotifications(notifications) {
      return set({
        notifications: notifications
      });
    },
    appendNotifications: function appendNotifications(newNotifications) {
      return set(function (state) {
        return {
          notifications: [].concat(_toConsumableArray(state.notifications), _toConsumableArray(newNotifications))
        };
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
    setPage: function setPage(page) {
      return set({
        page: page
      });
    },
    setHasMore: function setHasMore(hasMore) {
      return set({
        hasMore: hasMore
      });
    },
    fetchNotifications: function fetchNotifications(viewerId) {
      var page,
          limit,
          append,
          res,
          newNotifications,
          _args = arguments;
      return regeneratorRuntime.async(function fetchNotifications$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              page = _args.length > 1 && _args[1] !== undefined ? _args[1] : 1;
              limit = _args.length > 2 && _args[2] !== undefined ? _args[2] : 5;
              append = _args.length > 3 && _args[3] !== undefined ? _args[3] : false;
              set({
                loading: true,
                error: null
              });
              _context.prev = 4;
              _context.next = 7;
              return regeneratorRuntime.awrap((0, _notification.getNotifications)(viewerId, page, limit));

            case 7:
              res = _context.sent;
              newNotifications = res.data || [];

              if (append) {
                get().appendNotifications(newNotifications);
              } else {
                set({
                  notifications: newNotifications
                });
              }

              set({
                loading: false,
                page: page,
                hasMore: newNotifications.length === limit
              });
              _context.next = 16;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](4);
              set({
                error: "Failed to fetch notifications",
                loading: false
              });

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[4, 13]]);
    }
  };
});
var _default = useNotificationStore;
exports["default"] = _default;