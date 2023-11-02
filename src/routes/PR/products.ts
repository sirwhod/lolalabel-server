import express from 'express';
import authMiddleware from '../../middlewares/PR/auth';
import userMiddleware from '../../middlewares/PR/user';
import productController from '../../controllers/PR/productController';
import productExistsMiddleware from '../../middlewares/PR/productExists';
import validateProductMiddleware from '../../middlewares/PR/validationProduct';
import accessControlAllowOriginMiddlewareProduct from '../../middlewares/accessControlAllowOriginProduct';
import { 
  skuValidationMiddleware,
  versionValidationMiddleware, 
  newVersionValidationMiddleware, 
  compositionValidationMiddleware, 
  compositionINCIValidationMiddleware,
  productNameValidationMiddleware,
  productLineValidationMiddleware,
  productImageValidationMiddleware
} from '../../middlewares/PR/productValidation';

const product = express.Router();



product.post(
  '/pr/products/create/:idUser',
  authMiddleware, 
  userMiddleware, 
  skuValidationMiddleware,
  versionValidationMiddleware,  
  compositionValidationMiddleware, 
  compositionINCIValidationMiddleware,
  productNameValidationMiddleware,
  productLineValidationMiddleware,
  productImageValidationMiddleware,
  productController.createProduct
);
product.post(
  '/pr/products/copy',
  authMiddleware, 
  userMiddleware, 
  productExistsMiddleware,
  newVersionValidationMiddleware,
  compositionValidationMiddleware,
  compositionINCIValidationMiddleware,
  productController.copyProduct
);

product.get(
  '/pr/products/search/:idProduct',
  accessControlAllowOriginMiddlewareProduct,
  productController.findProduct
);

product.get(
  '/pr/products/registred',
  userMiddleware, 
  productController.registred
);
product.get(
  '/pr/products/validation', 
  userMiddleware, 
  productController.validation
);
product.get(
  '/pr/products/history', 
  userMiddleware, 
  productController.history
);
product.post(
  '/pr/products/qrcode',
  authMiddleware, 
  productController.qrcode
);

product.put(
  '/pr/products/accept',
  authMiddleware, 
  userMiddleware,
  validateProductMiddleware,
  productController.accept
);
product.put(
  '/pr/products/reject',
  authMiddleware, 
  userMiddleware, 
  productController.reject
);
product.put(
  '/pr/products/disable',
  authMiddleware, 
  userMiddleware, 
  productController.disable
);
product.put(
  '/pr/products/restore',
  authMiddleware, 
  userMiddleware, 
  productController.restore
);
product.put(
  '/pr/products/alterimages',
  authMiddleware, 
  userMiddleware, 
  productController.alter
);

export {
  product
};