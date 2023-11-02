"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _userRepositorie = require("../../repositories/PR/userRepositorie");
var _tokenAuth = require("../../utils/PR/tokenAuth");
var _FindUserIdService = require("../../service/PR/Users/FindUserIdService");
const findUserId = new _FindUserIdService.FindUserIdService(new _userRepositorie.UserRepository());
const userMiddleware = async (req, res, next) => {
  const {
    authorization
  } = req.headers;
  try {
    const id = (0, _tokenAuth.tokenDecoder)(authorization);
    console.log(id);
    const userExists = await findUserId.execute(id);
    if (!userExists) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Usuário não existe!'
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Token não é valido!'
    });
  }
};
var _default = userMiddleware;
exports.default = _default;