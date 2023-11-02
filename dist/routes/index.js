"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
exports.router = router;
router.get('/', (req, res) => {
  return res.send({
    message: '🚧Este é o endereço do Backend, seu acesso não está autorizado!🚧'
  });
});