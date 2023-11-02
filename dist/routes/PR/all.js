"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = void 0;
var _express = _interopRequireDefault(require("express"));
var _database = require("../../database");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const all = _express.default.Router();
exports.all = all;
all.get('/pr/instructions/all', async (_req, res) => {
  try {
    const allInstructionCount = await _database.prisma.instructions.count();
    const allInstructionsAccepted = await _database.prisma.instructionsValidate.count({
      where: {
        instructionAccept: true,
        whatInstruction: {
          isActive: true
        }
      }
    });
    const allInstructionsRejected = await _database.prisma.instructionsValidate.count({
      where: {
        instructionAccept: false
      }
    });
    const allInstructionsDisabled = await _database.prisma.instructionsDisabled.count();
    const allInstructionsInValidation = await _database.prisma.instructions.count({
      where: {
        isActive: false,
        isValidated: false
      }
    });
    const countValues = {
      registredInstruction: allInstructionCount,
      instructionsAccepted: allInstructionsAccepted,
      instructionsRejected: allInstructionsRejected,
      instructionsDisabled: allInstructionsDisabled,
      instructionsInValidation: allInstructionsInValidation
    };
    return res.status(201).json({
      error: false,
      message: 'Sucesso: Contagem de instruções encontrada!',
      data: {
        count: countValues
      }
    });
  } catch (err) {}
});
all.get('/pr/products/all', async (_req, res) => {
  try {
    const allProductCount = await _database.prisma.products.count();
    const allQrcodeCreated = await _database.prisma.products.count({
      where: {
        qrCodeIsActive: true,
        isActive: true,
        isValidated: true
      }
    });
    const allProductsAccepted = await _database.prisma.productsValidated.count({
      where: {
        productAccepted: true,
        whatProduct: {
          isActive: true
        }
      }
    });
    const allProductsRejected = await _database.prisma.productsValidated.count({
      where: {
        productAccepted: false
      }
    });
    const allProductsDisabled = await _database.prisma.productsDisabled.count();
    const allProductsInValidation = await _database.prisma.products.count({
      where: {
        isActive: false,
        isValidated: false
      }
    });
    const countValues = {
      registredProduct: allProductCount,
      qrcodeGenerated: allQrcodeCreated,
      productsAccepted: allProductsAccepted,
      productsRejected: allProductsRejected,
      productsDisabled: allProductsDisabled,
      productsInValidation: allProductsInValidation
    };
    return res.status(201).json({
      error: false,
      message: 'Sucesso: Contagem de produtos encontrada!',
      data: {
        count: countValues
      }
    });
  } catch (err) {}
});