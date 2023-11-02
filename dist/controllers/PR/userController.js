"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userRepositorie = require("../../repositories/PR/userRepositorie");
var _CreateUserService = require("../../service/PR/Users/CreateUserService");
var _AuthUserService = require("../../service/PR/Users/AuthUserService");
var _FindUserService = require("../../service/PR/Users/FindUserService");
var _FindManyUserService = require("../../service/PR/Users/FindManyUserService");
var _AlterUserService = require("../../service/PR/Users/AlterUserService");
var _AlterPasswordUserService = require("../../service/PR/Users/AlterPasswordUserService");
const createUser = new _CreateUserService.CreateUserService(new _userRepositorie.UserRepository());
const authUser = new _AuthUserService.AuthUserService(new _userRepositorie.UserRepository());
const findUser = new _FindUserService.FindUserService(new _userRepositorie.UserRepository());
const findManyUser = new _FindManyUserService.FindManyUserService(new _userRepositorie.UserRepository());
const alterUser = new _AlterUserService.AlterUserService(new _userRepositorie.UserRepository());
const alterPasswordUser = new _AlterPasswordUserService.AlterPasswordUserService(new _userRepositorie.UserRepository());
var _default = {
  async createUser(req, res) {
    try {
      const {
        username,
        name,
        imgProfile,
        departament,
        permission,
        password
      } = req.body;
      const userExists = await findUser.execute(username);
      if (userExists) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário já existe!'
        });
      }
      const user = await createUser.execute(username, name, imgProfile, departament, permission, password);
      if (user) {
        const userData = await findUser.execute(user.username);
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário Cadastrado!',
          data: userData
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async auth(req, res) {
    try {
      const {
        username,
        password
      } = req.body;
      const user = await authUser.execute(username, password);
      if (!user) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário ou senha incorretos!',
          data: null
        });
      }
      if (user) {
        return res.status(200).json({
          error: false,
          message: 'Sucesso: Usuário autenticado!',
          data: user
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async findUser(req, res) {
    try {
      const {
        username
      } = req.params;
      const user = await findUser.execute(username);
      if (user) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário encontrado!',
          data: user
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async findManyUsers(req, res) {
    try {
      const users = await findManyUser.execute();
      if (users) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuários encontrados!',
          data: users
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async alterUser(req, res) {
    try {
      const {
        id,
        departament,
        permission,
        active
      } = req.body;
      const user = await alterUser.execute(id, departament, permission, active);
      if (user) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário alterado!',
          data: user
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async alterPasswordUser(req, res) {
    try {
      const {
        id,
        password
      } = req.body;
      const user = await alterPasswordUser.execute(id, password);
      if (user) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Senha de usuário alterada!',
          data: user
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  }
};
exports.default = _default;