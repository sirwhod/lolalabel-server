"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clients = void 0;
var _express = _interopRequireDefault(require("express"));
var _clientsController = _interopRequireDefault(require("../../controllers/PS/clientsController"));
var _accessControlAllowOrigin = _interopRequireDefault(require("../../middlewares/accessControlAllowOrigin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const clients = _express.default.Router();
exports.clients = clients;
clients.post('/ps/clients/create', _accessControlAllowOrigin.default, _clientsController.default.createClient);
clients.get('/ps/clients/search/:nameevent', _accessControlAllowOrigin.default, _clientsController.default.findManyClients);