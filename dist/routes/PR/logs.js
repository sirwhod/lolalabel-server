"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logs = void 0;
var _express = _interopRequireDefault(require("express"));
var _database = require("../../database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const logs = _express.default.Router();
exports.logs = logs;
logs.get('/pr/logs', async (_req, res) => {
  try {
    const logsList = await _database.prisma.log.findMany({
      include: {
        agent: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        creationDate: 'desc'
      }
    });
    return res.status(201).json({
      error: false,
      message: 'Sucesso: Histórico encontrado!',
      data: {
        history: logsList
      }
    });
  } catch (err) {}
});