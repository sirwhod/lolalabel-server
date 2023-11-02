"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _database = require("../../database");
const productExistsMiddleware = async (req, res, next) => {
  try {
    const {
      idProduct,
      newVersion
    } = req.body;
    const product = await _database.prisma.products.findUnique({
      where: {
        id: idProduct
      }
    });
    if (product.version === newVersion) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Versão de produto já existe e está ativa!'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Produto não é valido!'
    });
  }
};
var _default = productExistsMiddleware;
exports.default = _default;