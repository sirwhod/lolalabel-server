"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.product = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = _interopRequireDefault(require("../../middlewares/PR/auth"));
var _user = _interopRequireDefault(require("../../middlewares/PR/user"));
var _productController = _interopRequireDefault(require("../../controllers/PR/productController"));
var _productExists = _interopRequireDefault(require("../../middlewares/PR/productExists"));
var _validationProduct = _interopRequireDefault(require("../../middlewares/PR/validationProduct"));
var _accessControlAllowOriginProduct = _interopRequireDefault(require("../../middlewares/accessControlAllowOriginProduct"));
var _productValidation = require("../../middlewares/PR/productValidation");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const product = _express.default.Router();
exports.product = product;
product.post('/pr/products/create/:idUser', _auth.default, _user.default, _productValidation.skuValidationMiddleware, _productValidation.versionValidationMiddleware, _productValidation.compositionValidationMiddleware, _productValidation.compositionINCIValidationMiddleware, _productValidation.productNameValidationMiddleware, _productValidation.productLineValidationMiddleware, _productValidation.productImageValidationMiddleware, _productController.default.createProduct);
product.post('/pr/products/copy', _auth.default, _user.default, _productExists.default, _productValidation.newVersionValidationMiddleware, _productValidation.compositionValidationMiddleware, _productValidation.compositionINCIValidationMiddleware, _productController.default.copyProduct);
product.get('/pr/products/search/:idProduct', _accessControlAllowOriginProduct.default, _productController.default.findProduct);
product.get('/pr/products/registred', _user.default, _productController.default.registred);
product.get('/pr/products/validation', _user.default, _productController.default.validation);
product.get('/pr/products/history', _user.default, _productController.default.history);
product.post('/pr/products/qrcode', _auth.default, _productController.default.qrcode);
product.put('/pr/products/accept', _auth.default, _user.default, _validationProduct.default, _productController.default.accept);
product.put('/pr/products/reject', _auth.default, _user.default, _productController.default.reject);
product.put('/pr/products/disable', _auth.default, _user.default, _productController.default.disable);
product.put('/pr/products/restore', _auth.default, _user.default, _productController.default.restore);
product.put('/pr/products/alterimages', _auth.default, _user.default, _productController.default.alter);