"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserService = void 0;
class CreateUserService {
  constructor(UserRepository) {
    this.UserRepository = UserRepository;
  }
  async execute(username, name, imgProfile, departament, permission, password) {
    const user = await this.UserRepository.create(username, name, imgProfile, departament, permission, password);
    return user;
  }
}
exports.CreateUserService = CreateUserService;