"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _productRepositorie = require("../../repositories/PR/productRepositorie");
var _CopyService = require("../../service/PR/Products/CopyService");
var _FindProductService = require("../../service/PR/Products/FindProductService");
var _FindProductsRegistredService = require("../../service/PR/Products/FindProductsRegistredService");
var _FindProductsValidationService = require("../../service/PR/Products/FindProductsValidationService");
var _FindProductsHistoryService = require("../../service/PR/Products/FindProductsHistoryService");
var _AcceptService = require("../../service/PR/Products/AcceptService");
var _RejectService = require("../../service/PR/Products/RejectService");
var _DisableService = require("../../service/PR/Products/DisableService");
var _RestoreService = require("../../service/PR/Products/RestoreService");
var _AlterService = require("../../service/PR/Products/AlterService");
var _QRCodeService = require("../../service/PR/Products/QRCodeService");
var _CreateProductService = require("../../service/PR/Products/CreateProductService");
var _historyRepositorie = require("../../repositories/PR/historyRepositorie");
var _CreateHistoryService = require("../../service/PR/History/CreateHistoryService");
const createHistory = new _CreateHistoryService.CreateHistoryService(new _historyRepositorie.HistoryRepositorie());
const createProduct = new _CreateProductService.CreateProductService(new _productRepositorie.ProductRepositorie());
const copyProduct = new _CopyService.CopyProductService(new _productRepositorie.ProductRepositorie());
const findProduct = new _FindProductService.FindProductService(new _productRepositorie.ProductRepositorie());
const findProductsRegistred = new _FindProductsRegistredService.FindProductsRegistredService(new _productRepositorie.ProductRepositorie());
const findProductsValidation = new _FindProductsValidationService.FindProductsValidationService(new _productRepositorie.ProductRepositorie());
const findProductsHistory = new _FindProductsHistoryService.FindProductsHistoryService(new _productRepositorie.ProductRepositorie());
const acceptProduct = new _AcceptService.AcceptService(new _productRepositorie.ProductRepositorie());
const rejectProduct = new _RejectService.RejectService(new _productRepositorie.ProductRepositorie());
const disableProduct = new _DisableService.DisableService(new _productRepositorie.ProductRepositorie());
const restoreProduct = new _RestoreService.RestoreService(new _productRepositorie.ProductRepositorie());
const alterProduct = new _AlterService.AlterService(new _productRepositorie.ProductRepositorie());
const qrcodeProduct = new _QRCodeService.QRCodeService(new _productRepositorie.ProductRepositorie());
var _default = {
  async createProduct(req, res) {
    try {
      const {
        sku,
        version,
        productName,
        productLine,
        productImage,
        composition,
        compositionINCI,
        Stamps,
        idUser
      } = req.body;
      const newProduct = await createProduct.execute(idUser, sku, version, productName, productLine, productImage, composition, compositionINCI, Stamps);
      const product = await findProduct.execute(newProduct.id);
      const history = await createHistory.execute('Criação de novo Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, idUser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Cadastrado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      console.log(err);
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async copyProduct(req, res) {
    try {
      const {
        iduser
      } = req.body;
      const {
        idProduct,
        newVersion,
        composition,
        compositionINCI,
        copyInstruction
      } = req.body;
      const newProduct = await copyProduct.execute(iduser, idProduct, newVersion, composition, compositionINCI, copyInstruction);
      const product = await findProduct.execute(newProduct.id);
      const history = await createHistory.execute('Cópia de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Cadastrado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async registred(_req, res) {
    try {
      const products = await findProductsRegistred.execute();
      if (products.length === 0) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nenhum produto encontrado!'
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produtos Encontrados!',
        data: products
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async validation(_req, res) {
    try {
      const products = await findProductsValidation.execute();
      if (products.length === 0) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nenhum produto encontrado!'
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produtos Encontrados!',
        data: products
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async history(_req, res) {
    try {
      const products = await findProductsHistory.execute();
      console.log(products);
      if (products.length === 0) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nenhum produto encontrado!'
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produtos Encontrados!',
        data: products
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async findProduct(req, res) {
    try {
      const {
        idProduct
      } = req.params;
      const product = await findProduct.execute(idProduct);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Encontrado!',
        data: product
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async accept(req, res) {
    try {
      const {
        idproduct,
        iduser
      } = req.body;
      const product = await acceptProduct.execute(idproduct, iduser);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      const history = await createHistory.execute('Aprovação de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Aprovado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async reject(req, res) {
    try {
      const {
        idproduct,
        iduser
      } = req.body;
      const product = await rejectProduct.execute(idproduct, iduser);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      const history = await createHistory.execute('Rejeição de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Rejeitado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async disable(req, res) {
    try {
      const {
        reason,
        idproduct,
        iduser
      } = req.body;
      const product = await disableProduct.execute(idproduct, iduser, reason);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      const history = await createHistory.execute('Desabilitação de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Desabilitado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async restore(req, res) {
    try {
      const {
        idproduct,
        iduser
      } = req.body;
      const product = await restoreProduct.execute(idproduct);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      const history = await createHistory.execute('Restauração de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Restaurado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async alter(req, res) {
    try {
      const {
        Stamps,
        productImage,
        idproduct,
        iduser
      } = req.body;
      const product = await alterProduct.execute(idproduct, productImage, Stamps);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      const history = await createHistory.execute('Alteração de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Alterado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async qrcode(req, res) {
    try {
      const {
        idproduct,
        iduser
      } = req.body;
      const product = await qrcodeProduct.execute(idproduct);
      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!'
        });
      }
      const history = await createHistory.execute('Visualização de QRCode de Produto', true, `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`, iduser);
      return res.status(201).json({
        error: false,
        message: 'Sucesso: QRCode Gerado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  }
};
exports.default = _default;