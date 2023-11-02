"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserService = void 0;
class FindUserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute(username) {
    const user = await this.UserRepository.find(username);
    return user;
  }
}
exports.FindUserService = FindUserService;