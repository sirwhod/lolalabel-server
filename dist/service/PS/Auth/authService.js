"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthService = void 0;
class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  async execute(password, username) {
    const event = await this.authRepository.auth(password, username);
    return event;
  }
}
exports.AuthService = AuthService;