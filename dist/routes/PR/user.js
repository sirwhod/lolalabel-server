"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../middlewares/PR/auth"));
var _user = _interopRequireDefault(require("../../middlewares/PR/user"));
var _userController = _interopRequireDefault(require("../../controllers/PR/userController"));
var _accessControlAllowOriginPR = _interopRequireDefault(require("../../middlewares/accessControlAllowOriginPR"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const user = _express.default.Router();
exports.user = user;
user.post('/pr/user/new', _accessControlAllowOriginPR.default, _auth.default, _user.default, _userController.default.createUser);
user.post('/auth', _accessControlAllowOriginPR.default, _userController.default.auth);
user.get('/pr/user/:username', _accessControlAllowOriginPR.default, _auth.default, _user.default, _userController.default.findUser);
user.get('/pr/users/registred', _accessControlAllowOriginPR.default, _auth.default, _user.default, _userController.default.findManyUsers);
user.put('/pr/user/alter', _accessControlAllowOriginPR.default, _auth.default, _user.default, _userController.default.alterUser);
user.put('/pr/user/alterpassword', _accessControlAllowOriginPR.default, _auth.default, _user.default, _userController.default.alterPasswordUser);