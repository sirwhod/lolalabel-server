"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = _interopRequireDefault(require("../../controllers/PS/authController"));
var _accessControlAllowOrigin = _interopRequireDefault(require("../../middlewares/accessControlAllowOrigin"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const auth = _express.default.Router();
exports.auth = auth;
auth.post('/ps/auth', _accessControlAllowOrigin.default, _authController.default.auth);