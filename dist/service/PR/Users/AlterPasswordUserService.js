"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterPasswordUserService = void 0;
class AlterPasswordUserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute(id, password) {
    const user = await this.UserRepository.alterPassword(id, password);
    return user;
  }
}
exports.AlterPasswordUserService = AlterPasswordUserService;