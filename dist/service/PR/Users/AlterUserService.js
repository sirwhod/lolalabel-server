"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserService = void 0;
class AlterUserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute(id, departament, permission, active) {
    const user = await this.UserRepository.alter(id, departament, permission, active);
    return user;
  }
}
exports.AlterUserService = AlterUserService;