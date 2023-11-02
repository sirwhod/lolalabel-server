"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whatIAmInstructionMiddleware = exports.precautionInstructionMiddleware = exports.modeOfUseInstructionMiddleware = exports.default = void 0;
var _database = require("../../database");
const ValidationInstructionMiddleware = async (req, res, next) => {
  try {
    const {
      idinstruction
    } = req.body;
    const {
      language,
      whatProduct
    } = await _database.prisma.instructions.findUnique({
      where: {
        id: idinstruction
      },
      include: {
        whatProduct: true
      }
    });
    const {
      Instructions
    } = await _database.prisma.products.findUnique({
      where: {
        id: whatProduct.id
      },
      include: {
        Instructions: true
      }
    });
    const instruction = Instructions.find(instruction => {
      return instruction.language === language && instruction.isActive === true && instruction.isValidated === true;
    });
    if (instruction) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Instrução já existe e está ativa!'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Instrução não é valida!'
    });
  }
};
const precautionInstructionMiddleware = async (req, res, next) => {
  try {
    const {
      Precaution
    } = req.body;
    if (Precaution.length > 2000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "Precaution" maior que 2000!'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Erro não tratado, favor entrar em contato com o administrador!'
    });
  }
};
exports.precautionInstructionMiddleware = precautionInstructionMiddleware;
const modeOfUseInstructionMiddleware = async (req, res, next) => {
  try {
    const {
      modeOfUse
    } = req.body;
    if (modeOfUse.length > 2000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "modeOfUse" maior que 2000!'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Erro não tratado, favor entrar em contato com o administrador!'
    });
  }
};
exports.modeOfUseInstructionMiddleware = modeOfUseInstructionMiddleware;
const whatIAmInstructionMiddleware = async (req, res, next) => {
  try {
    const {
      whatIAm
    } = req.body;
    if (whatIAm.length > 2000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "whatIAm" maior que 2000!'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Erro não tratado, favor entrar em contato com o administrador!'
    });
  }
};
exports.whatIAmInstructionMiddleware = whatIAmInstructionMiddleware;
var _default = ValidationInstructionMiddleware;
exports.default = _default;