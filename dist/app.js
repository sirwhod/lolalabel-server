"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _routes = require("./routes");
var _instructions = require("./routes/PR/instructions");
var _products = require("./routes/PR/products");
var _user = require("./routes/PR/user");
var _qrcode = require("./routes/PR/qrcode");
var _clients = require("./routes/PS/clients");
var _events = require("./routes/PS/events");
var _auth = require("./routes/PS/auth");
var _logs = require("./routes/PR/logs");
var _all = require("./routes/PR/all");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use((0, _cors.default)({
  origin: ['http://localhost:3006', 'http://localhost:5173', 'http://localhost:3000', 'http://192.168.1.92', 'http://192.168.1.92:3000', 'http://label.lolafromrio.com.br', 'http://label.lolafromrio.com.br:3000'],
  methods: ['GET', 'OPTIONS', 'PATCH', 'DELETE', 'POST', 'PUT'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version', 'Authorization']
}));
app.use(_routes.router);

// PR = Plataforma Rótulos

app.use(_products.product);
app.use(_instructions.instruction);
app.use(_user.user);
app.use(_qrcode.qrcode);
app.use(_logs.logs);
app.use(_all.all);

// PS = Plataforma Sorteios

app.use(_clients.clients);
app.use(_events.event);
app.use(_auth.auth);