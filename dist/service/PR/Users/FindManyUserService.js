"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindManyUserService = void 0;
class FindManyUserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute() {
    const users = await this.UserRepository.findMany();
    return users;
  }
}
exports.FindManyUserService = FindManyUserService;