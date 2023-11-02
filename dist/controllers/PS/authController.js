"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _authRepositorie = require("../../repositories/PS/authRepositorie");
var _authService = require("../../service/PS/Auth/authService");
const authService = new _authService.AuthService(new _authRepositorie.AuthRepository());
var _default = {
  async auth(req, res) {
    try {
      const {
        password,
        username
      } = req.body;
      const auth = await authService.execute(password, username);
      if (!auth) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário ou senha estão incorretos!',
          data: null
        });
      }
      if (auth) {
        res.header('Access-Control-Allow-Origin', 'http://sorteio.lolacosmetics.com.br');
        res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
        res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário Autenticado!',
          data: auth
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