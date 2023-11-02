"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserIdService = void 0;
class FindUserIdService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute(id) {
    const user = await this.UserRepository.findUserId(id);
    return user;
  }
}
exports.FindUserIdService = FindUserIdService;