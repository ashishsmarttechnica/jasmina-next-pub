"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postShare = exports.SinglePostById = exports.unlikePost = exports.likePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;

var _axios = _interopRequireDefault(require("@/lib/axios"));

var _jsCookie = _interopRequireDefault(require("js-cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllPosts = function getAllPosts() {
  var page,
      limit,
      res,
      _args = arguments;
  return regeneratorRuntime.async(function getAllPosts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          page = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
          limit = _args.length > 1 && _args[1] !== undefined ? _args[1] : 4;
          _context.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("user/home/page?page=".concat(page, "&limit=").concat(limit, "&viewerId=").concat(_jsCookie["default"].get("userId"))));

        case 4:
          res = _context.sent;
          return _context.abrupt("return", res.data);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllPosts = getAllPosts;

var getPostById = function getPostById(id) {
  var res;
  return regeneratorRuntime.async(function getPostById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("user/home/page?id=".concat(id)));

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

exports.getPostById = getPostById;

var createPost = function createPost(data) {
  var res;
  return regeneratorRuntime.async(function createPost$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("/create/post", data));

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

exports.createPost = createPost;

var likePost = function likePost(id) {
  var res;
  return regeneratorRuntime.async(function likePost$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("/create/like", {
            postId: id,
            userId: _jsCookie["default"].get("userId")
          }));

        case 2:
          res = _context4.sent;
          return _context4.abrupt("return", res.data);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.likePost = likePost;

var unlikePost = function unlikePost(id) {
  var res;
  return regeneratorRuntime.async(function unlikePost$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("/remove/like", {
            postId: id,
            userId: _jsCookie["default"].get("userId")
          }));

        case 2:
          res = _context5.sent;
          return _context5.abrupt("return", res.data);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // export const SinglePost = async (id) => {
//   const res = await axios.get(`/get/single/post?id=${id}`, {
//     postId: id,
//     userId: Cookies.get("postId"),
//   });
// };


exports.unlikePost = unlikePost;

var SinglePostById = function SinglePostById(id) {
  var res;
  return regeneratorRuntime.async(function SinglePostById$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/get/single/post", {
            params: {
              id: id
            }
          }));

        case 2:
          res = _context6.sent;
          return _context6.abrupt("return", res.data);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.SinglePostById = SinglePostById;

var postShare = function postShare(id) {
  var res;
  return regeneratorRuntime.async(function postShare$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("/share/post?postId=".concat(id)));

        case 2:
          res = _context7.sent;
          return _context7.abrupt("return", res.data);

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
};

exports.postShare = postShare;