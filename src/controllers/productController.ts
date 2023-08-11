import {Request, Response} from 'express';
import { CreateProductService } from '../service/Products/CreateProductService';

import { ProductRepositorie } from '../repositories/productRepositorie';
import { Stamps } from '@prisma/client';
import { FindProductService } from '../service/Products/FindProductService';
import { FindProductsRegistredService } from '../service/Products/FindProductsRegistredService';
import { FindProductsValidationService } from '../service/Products/FindProductsValidationService';
import { FindProductsHistoryService } from '../service/Products/FindProductsHistoryService';
import { AcceptService } from '../service/Products/AcceptService';
import { RejectService } from '../service/Products/RejectService';
import { DisableService } from '../service/Products/DisableService';
import { RestoreService } from '../service/Products/RestoreService';
import { AlterService } from '../service/Products/AlterService';
import { CopyProductService } from '../service/Products/CopyService';

const createProduct = new CreateProductService(new ProductRepositorie());
const copyProduct = new CopyProductService(new ProductRepositorie());
const findProduct = new FindProductService(new ProductRepositorie());
const findProductsRegistred = new FindProductsRegistredService(new ProductRepositorie());
const findProductsValidation = new FindProductsValidationService(new ProductRepositorie());
const findProductsHistory = new FindProductsHistoryService(new ProductRepositorie());
const acceptProduct = new AcceptService(new ProductRepositorie());
const rejectProduct = new RejectService(new ProductRepositorie());
const disableProduct = new DisableService(new ProductRepositorie());
const restoreProduct = new RestoreService(new ProductRepositorie());
const alterProduct = new AlterService(new ProductRepositorie());

interface ProductProps extends Request {
  body: {
    id: string;
    sku: string;
    version: string;
    productName: string;
    productLine: string;
    productImage: string;
    composition: string;
    authorId: string;
    creationDate: Date;
    updatedAt: Date;
    isActive: boolean;
    isValidated: boolean;
    qrCodeIsActive: boolean;
    Stamps: Stamps[];
    copyInstruction: boolean;
    reason: string;
    idProduct: string; 
    newVersion: string;
  }
  params: {
    idUser: string;
    idProduct: string;
  }
  headers: {
    iduser: string;
    idproduct: string;
  }
}

export default {
  async createProduct(req: ProductProps, res: Response) {
    try {
      const {
        sku,
        version,
        productName,
        productLine,
        productImage,
        composition,
        Stamps
      } = req.body;
      const { idUser } = req.params;

      const newProduct = await createProduct.execute(
        idUser,
        sku,
        version,
        productName,
        productLine,
        productImage,
        composition,
        Stamps
      );

      const product = await findProduct.execute(newProduct.id);

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Cadastrado!',
        data: product
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async copyProduct(req: ProductProps, res: Response) {
    try {
      const { iduser } = req.headers;
      const { 
        idProduct, 
        newVersion, 
        composition, 
        copyInstruction 
      } = req.body;

      const newProduct = await copyProduct.execute(
        iduser, 
        idProduct, 
        newVersion, 
        composition, 
        copyInstruction
      );

      const product = await findProduct.execute(newProduct.id);

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Cadastrado!',
        data: product
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async registred(_req: ProductProps, res: Response) {
    try {
      const products = await findProductsRegistred.execute();

      if (products.length === 0) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nenhum produto encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produtos Encontrados!',
        data: products
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async validation(_req: ProductProps, res: Response) {
    try {
      const products = await findProductsValidation.execute();

      if (products.length === 0) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nenhum produto encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produtos Encontrados!',
        data: products
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async history(_req: ProductProps, res: Response) {
    try {
      const products = await findProductsHistory.execute();

      if (products.length === 0) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Nenhum produto encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produtos Encontrados!',
        data: products
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findProduct(req: ProductProps, res: Response) {
    try {
      const { idProduct } = req.params;

      const product = await findProduct.execute(idProduct);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Encontrado!',
        data: product
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async accept(req: ProductProps, res: Response) {
    try {
      const { idproduct, iduser } = req.headers; 

      const product = await acceptProduct.execute(idproduct, iduser);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Aceito!',
        data: product
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async reject(req: ProductProps, res: Response) {
    try {
      const { idproduct, iduser } = req.headers; 

      const product = await rejectProduct.execute(idproduct, iduser);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Rejeitado!',
        data: product
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async disable(req: ProductProps, res: Response) {
    try {
      const { idproduct, iduser } = req.headers; 
      const { reason } = req.body; 

      const product = await disableProduct.execute(idproduct, iduser, reason);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Desabilitado!',
        data: product
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async restore(req: ProductProps, res: Response) {
    try {
      const { idproduct } = req.headers; 

      const product = await restoreProduct.execute(idproduct);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Restaurado!',
        data: product
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alter(req: ProductProps, res: Response) {
    try {
      const { Stamps, productImage } = req.body;
      const { idproduct } = req.headers;

      const product = await alterProduct.execute(idproduct, productImage, Stamps);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Alterado!',
        data: product
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  }

};
