"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongodb = _interopRequireDefault(require("mongodb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.use(_bodyParser.default.json());
app.use((0, _cors.default)());
app.get("/getHabitos", function (req, res) {
  connect(loadFunc, "habitos", res);
});
app.get("/getAllpoints", function (req, res) {
  connect(loadFunc, "instituicoes", res);
});

var loadFunc = function loadFunc(db, type, res) {
  var database = db.db("fiquebem");
  database.collection(type).find({}).toArray(function (err, doc) {
    res.send(doc);
    db.close();
    res.end();
  });
};

var connect = function connect(thenFunc, where, res) {
  _mongodb.default.connect("mongodb://peitro:peitrogay1@ds111244.mlab.com:11244/fiquebem", function (err, db) {
    if (!err) thenFunc(db, where, res);
  });
};

app.listen(3000, function (req, res) {
  console.log("Server Running on 3000");
});