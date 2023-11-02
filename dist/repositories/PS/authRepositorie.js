"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthRepository = void 0;
var _database = require("../../database");
class AuthRepository {
  async auth(password, username) {
    const eventsList = await _database.prisma.loginEvents.findFirst({
      where: {
        name: username,
        password: password
      }
    });
    return eventsList;
  }
}
exports.AuthRepository = AuthRepository;