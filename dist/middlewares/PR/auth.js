"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tokenAuth = require("../../utils/PR/tokenAuth");
const authMiddleware = async (req, res, next) => {
  const {
    authorization
  } = req.headers;
  if (!authorization) {
    return res.status(404).json({
      error: true,
      message: 'Erro: Token não existe!'
    });
  }
  try {
    const id = (0, _tokenAuth.tokenDecoder)(authorization);
    if (id) {
      next();
    } else {
      return res.status(404).json({
        error: true,
        message: 'Erro: Token não é valido!'
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Token não é valido!'
    });
  }
};
var _default = authMiddleware;
exports.default = _default;