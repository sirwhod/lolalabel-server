"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthUserService = void 0;
class AuthUserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute(username, password) {
    const user = await this.UserRepository.auth(username, password);
    return user;
  }
}
exports.AuthUserService = AuthUserService;