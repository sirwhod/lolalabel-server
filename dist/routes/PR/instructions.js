"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instruction = void 0;
var _express = _interopRequireDefault(require("express"));
var _instructionController = _interopRequireDefault(require("../../controllers/PR/instructionController"));
var _auth = _interopRequireDefault(require("../../middlewares/PR/auth"));
var _user = _interopRequireDefault(require("../../middlewares/PR/user"));
var _validateInstructiont = _interopRequireWildcard(require("../../middlewares/PR/validateInstructiont"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const instruction = _express.default.Router();
exports.instruction = instruction;
instruction.post('/pr/instructions/create', _auth.default, _user.default, _validateInstructiont.precautionInstructionMiddleware, _validateInstructiont.modeOfUseInstructionMiddleware, _validateInstructiont.whatIAmInstructionMiddleware, _instructionController.default.create);
instruction.get('/pr/instructions/registred', _user.default, _instructionController.default.registred);
instruction.get('/pr/instructions/validation', _user.default, _instructionController.default.validation);
instruction.get('/pr/instructions/history', _user.default, _instructionController.default.history);
instruction.put('/pr/instructions/accept', _auth.default, _user.default, _validateInstructiont.default, _instructionController.default.accept);
instruction.put('/pr/instructions/reject', _auth.default, _user.default, _instructionController.default.reject);
instruction.put('/pr/instructions/disable', _auth.default, _user.default, _instructionController.default.disable);
instruction.put('/pr/instructions/restore', _auth.default, _user.default, _instructionController.default.restore);