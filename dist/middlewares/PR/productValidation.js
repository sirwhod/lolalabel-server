"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.versionValidationMiddleware = exports.skuValidationMiddleware = exports.productNameValidationMiddleware = exports.productLineValidationMiddleware = exports.productImageValidationMiddleware = exports.newVersionValidationMiddleware = exports.compositionValidationMiddleware = exports.compositionINCIValidationMiddleware = void 0;
const versionValidationMiddleware = async (req, res, next) => {
  try {
    const {
      version
    } = req.body;
    if (version.length !== 7) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Tamanho da versão está incorreto!'
      });
    }
    if (version[0] !== 'v') {
      return res.status(404).json({
        error: true,
        message: 'Erro: A versão deve começar com "v"!'
      });
    }
    if (version[1] !== '.') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O segundo caractere da versão deve ser "."!'
      });
    }
    if (version[2] !== 'A' && version[2] !== 'B' && version[2] !== 'C' && version[2] !== 'D' && version[2] !== 'E' && version[2] !== 'F' && version[2] !== 'G' && version[2] !== 'H' && version[2] !== 'I' && version[2] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O terceiro caractere deve entre "A" e "J"'
      });
    }
    ;
    if (version[3] !== 'A' && version[3] !== 'B' && version[3] !== 'C' && version[3] !== 'D' && version[3] !== 'E' && version[3] !== 'F' && version[3] !== 'G' && version[3] !== 'H' && version[3] !== 'I' && version[3] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O quarto caractere deve entre "A" e "J"'
      });
    }
    ;
    if (version[4] !== '/') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O quinto caractere da versão deve ser "/"!'
      });
    }
    if (version[5] !== 'A' && version[5] !== 'B' && version[5] !== 'C' && version[5] !== 'D' && version[5] !== 'E' && version[5] !== 'F' && version[5] !== 'G' && version[5] !== 'H' && version[5] !== 'I' && version[5] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O sexto caractere deve entre "A" e "J"'
      });
    }
    ;
    if (version[6] !== 'A' && version[6] !== 'B' && version[6] !== 'C' && version[6] !== 'D' && version[6] !== 'E' && version[6] !== 'F' && version[6] !== 'G' && version[6] !== 'H' && version[6] !== 'I' && version[6] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O sétimo caractere deve entre "A" e "J"'
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
exports.versionValidationMiddleware = versionValidationMiddleware;
const newVersionValidationMiddleware = async (req, res, next) => {
  try {
    const {
      newVersion
    } = req.body;
    if (newVersion.length !== 7) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Tamanho da versão está incorreto!'
      });
    }
    if (newVersion[0] !== 'v') {
      return res.status(404).json({
        error: true,
        message: 'Erro: A versão deve começar com "v"!'
      });
    }
    if (newVersion[1] !== '.') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O segundo caractere da versão deve ser "."!'
      });
    }
    if (newVersion[2] !== 'A' && newVersion[2] !== 'B' && newVersion[2] !== 'C' && newVersion[2] !== 'D' && newVersion[2] !== 'E' && newVersion[2] !== 'F' && newVersion[2] !== 'G' && newVersion[2] !== 'H' && newVersion[2] !== 'I' && newVersion[2] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O terceiro caractere deve entre "A" e "J"'
      });
    }
    ;
    if (newVersion[3] !== 'A' && newVersion[3] !== 'B' && newVersion[3] !== 'C' && newVersion[3] !== 'D' && newVersion[3] !== 'E' && newVersion[3] !== 'F' && newVersion[3] !== 'G' && newVersion[3] !== 'H' && newVersion[3] !== 'I' && newVersion[3] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O quarto caractere deve entre "A" e "J"'
      });
    }
    ;
    if (newVersion[4] !== '/') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O quinto caractere da versão deve ser "/"!'
      });
    }
    if (newVersion[5] !== 'A' && newVersion[5] !== 'B' && newVersion[5] !== 'C' && newVersion[5] !== 'D' && newVersion[5] !== 'E' && newVersion[5] !== 'F' && newVersion[5] !== 'G' && newVersion[5] !== 'H' && newVersion[5] !== 'I' && newVersion[5] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O sexto caractere deve entre "A" e "J"'
      });
    }
    ;
    if (newVersion[6] !== 'A' && newVersion[6] !== 'B' && newVersion[6] !== 'C' && newVersion[6] !== 'D' && newVersion[6] !== 'E' && newVersion[6] !== 'F' && newVersion[6] !== 'G' && newVersion[6] !== 'H' && newVersion[6] !== 'I' && newVersion[6] !== 'J') {
      return res.status(404).json({
        error: true,
        message: 'Erro: O sétimo caractere deve entre "A" e "J"'
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
exports.newVersionValidationMiddleware = newVersionValidationMiddleware;
const compositionValidationMiddleware = async (req, res, next) => {
  try {
    const {
      composition
    } = req.body;
    if (composition.length > 2000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "Composição" maior que 2000!'
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
exports.compositionValidationMiddleware = compositionValidationMiddleware;
const compositionINCIValidationMiddleware = async (req, res, next) => {
  try {
    const {
      compositionINCI
    } = req.body;
    if (compositionINCI.length > 2000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "Composição INCI" maior que 2000!'
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
exports.compositionINCIValidationMiddleware = compositionINCIValidationMiddleware;
const skuValidationMiddleware = async (req, res, next) => {
  try {
    const {
      sku
    } = req.body;
    if (sku.length > 100) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "sku" maior que 100!'
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
exports.skuValidationMiddleware = skuValidationMiddleware;
const productNameValidationMiddleware = async (req, res, next) => {
  try {
    const {
      productName
    } = req.body;
    if (productName.length > 1000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "productName" maior que 1000!'
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
exports.productNameValidationMiddleware = productNameValidationMiddleware;
const productLineValidationMiddleware = async (req, res, next) => {
  try {
    const {
      productLine
    } = req.body;
    if (productLine.length > 1000) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Número de caracteres no campo "productLine" maior que 1000!'
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
exports.productLineValidationMiddleware = productLineValidationMiddleware;
const productImageValidationMiddleware = async (req, res, next) => {
  try {
    const {
      productImage
    } = req.body;
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    const testUrl = urlPattern.test(productImage);
    if (!testUrl) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Url inválida'
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
exports.productImageValidationMiddleware = productImageValidationMiddleware;