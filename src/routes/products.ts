import express from 'express';

const product = express.Router();

import productController from '../controllers/productController';
import authMiddleware from '../middlewares/auth';
import userMiddleware from '../middlewares/user';

product.post(
  '/pr/products/create/:idUser',
  authMiddleware, 
  userMiddleware, 
  productController.createProduct
);
product.post(
  '/pr/products/copy',
  authMiddleware, 
  userMiddleware, 
  productController.copyProduct
);

product.get(
  '/pr/products/search/:idProduct',
  productController.findProduct);

product.get(
  '/pr/products/registred',
  authMiddleware, 
  userMiddleware, 
  productController.registred
);
product.get(
  '/pr/products/validation',
  authMiddleware, 
  userMiddleware, 
  productController.validation
);
product.get(
  '/pr/products/history',
  authMiddleware, 
  userMiddleware, 
  productController.history
);

product.put(
  '/pr/products/accept',
  authMiddleware, 
  userMiddleware, 
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