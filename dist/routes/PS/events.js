"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.event = void 0;
var _express = _interopRequireDefault(require("express"));
var _eventsController = _interopRequireDefault(require("../../controllers/PS/eventsController"));
var _accessControlAllowOrigin = _interopRequireDefault(require("../../middlewares/accessControlAllowOrigin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const event = _express.default.Router();
exports.event = event;
event.get('/ps/events/search', _accessControlAllowOrigin.default, _eventsController.default.findManyEvents);
event.get('/ps/events/search/:nameevent', _accessControlAllowOrigin.default, _eventsController.default.findEvent);
event.post('/ps/events/create', _accessControlAllowOrigin.default, _eventsController.default.createEvent);
event.put('/ps/events/drawprize', _accessControlAllowOrigin.default, _eventsController.default.drawprizeEvents);
event.put('/ps/events/action/:idEvent', _accessControlAllowOrigin.default, _eventsController.default.actionEvents);