"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongodb = require("mongodb");

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  credentials: true,
  origin: true
}));
app.options('*', (0, _cors["default"])());
var _process$env = process.env,
    MONGO_DATABASE_USERNAME = _process$env.MONGO_DATABASE_USERNAME,
    MONGO_DATABASE_PASSWORD = _process$env.MONGO_DATABASE_PASSWORD,
    MONGO_DATABASE_CLUSTER = _process$env.MONGO_DATABASE_CLUSTER,
    MONGO_DATABASE = _process$env.MONGO_DATABASE;
var uri = "mongodb+srv://".concat(MONGO_DATABASE_USERNAME, ":").concat(MONGO_DATABASE_PASSWORD, "@").concat(MONGO_DATABASE_CLUSTER, "/").concat(MONGO_DATABASE, "?retryWrites=true&w=majority");
/**
 * Breaders CRUD
 */

app.route('/breeders').get( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var mongoClient, client, collection, all;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mongoClient = new _mongodb.MongoClient(uri);
            _context.next = 3;
            return mongoClient.connect();

          case 3:
            client = _context.sent;
            collection = client.db(process.env.MONGO_DATABASE).collection("feeders");
            _context.next = 7;
            return collection.find({}).toArray();

          case 7:
            all = _context.sent;
            _context.next = 10;
            return mongoClient.close();

          case 10:
            if (all) {
              res.status(200).json({
                feeders: all
              });
            } else {
              res.status(404);
            }

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.listen(process.env.PORT || 3000, function () {
  console.log('server running on port 3000', '');
});