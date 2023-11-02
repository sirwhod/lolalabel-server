"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _database = require("../../database");
const validateProductMiddleware = async (req, res, next) => {
  try {
    const {
      idproduct
    } = req.body;
    const validationProduct = await _database.prisma.products.findUnique({
      where: {
        id: idproduct
      }
    });
    const products = await _database.prisma.products.findMany();
    const equalProductVersionAndCode = products.find(product => {
      return product.sku === validationProduct.sku && product.version === validationProduct.version && product.isActive === true && product.isValidated;
    });
    if (equalProductVersionAndCode) {
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
var _default = validateProductMiddleware;
exports.default = _default;