"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryRepositorie = void 0;
var _database = require("../../database");
var _getDataBrazil = require("../../utils/getDataBrazil");
class HistoryRepositorie {
  async create(action, productOrInstruction, itemName, agent) {
    const date = (0, _getDataBrazil.getDateBrazil)();
    const history = await _database.prisma.log.create({
      data: {
        action: action,
        productOrInstruction: productOrInstruction,
        itemName: itemName,
        agent: {
          connect: {
            id: agent
          }
        },
        creationDate: date
      },
      include: {
        agent: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return history;
  }
}
exports.HistoryRepositorie = HistoryRepositorie;