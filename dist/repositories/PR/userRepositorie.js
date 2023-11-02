"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserRepository = void 0;
var _bcryptjs = require("bcryptjs");
var _database = require("../../database");
var _tokenAuth = require("../../utils/PR/tokenAuth");
class UserRepository {
  async create(username, name, imgProfile, departament, permission, password) {
    const hash_password = await (0, _bcryptjs.hash)(password, 8);
    const user = await _database.prisma.users.create({
      data: {
        username,
        name,
        imgProfile,
        departament,
        permission,
        password: hash_password
      }
    });
    return user;
  }
  async auth(username, password) {
    const user = await _database.prisma.users.findFirst({
      where: {
        username,
        active: true
      }
    });
    const isValuePassword = await (0, _bcryptjs.compare)(password, user.password);
    if (isValuePassword) {
      const token = (0, _tokenAuth.tokenGenerator)(user.id);
      return {
        user: {
          id: user.id,
          name: user.name,
          imgProfile: user.imgProfile,
          departament: user.departament,
          permission: user.permission
        },
        token
      };
    }
  }
  async find(username) {
    const user = await _database.prisma.users.findUnique({
      where: {
        username: username
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true
      }
    });
    return user;
  }
  async findUserId(id) {
    const user = await _database.prisma.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true
      }
    });
    return user;
  }
  async findMany() {
    const users = await _database.prisma.users.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true
      }
    });
    return users;
  }
  async alter(id, departament, permission, active) {
    const user = await _database.prisma.users.update({
      where: {
        id
      },
      data: {
        departament,
        permission,
        active
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true
      }
    });
    return user;
  }
  async alterPassword(id, password) {
    const hash_password = await (0, _bcryptjs.hash)(password, 8);
    const user = await _database.prisma.users.update({
      where: {
        id
      },
      data: {
        password: hash_password
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true
      }
    });
    return user;
  }
}
exports.UserRepository = UserRepository;