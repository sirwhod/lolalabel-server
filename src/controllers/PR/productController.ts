import {Request, Response} from 'express';

import { ProductRepositorie } from '../../repositories/PR/productRepositorie';
import { CopyProductService } from '../../service/PR/Products/CopyService';
import { FindProductService } from '../../service/PR/Products/FindProductService';
import { FindProductsRegistredService } from '../../service/PR/Products/FindProductsRegistredService';
import { FindProductsValidationService } from '../../service/PR/Products/FindProductsValidationService';
import { FindProductsHistoryService } from '../../service/PR/Products/FindProductsHistoryService';
import { AcceptService } from '../../service/PR/Products/AcceptService';
import { RejectService } from '../../service/PR/Products/RejectService';
import { DisableService } from '../../service/PR/Products/DisableService';
import { RestoreService } from '../../service/PR/Products/RestoreService';
import { AlterService } from '../../service/PR/Products/AlterService';
import { QRCodeService } from '../../service/PR/Products/QRCodeService';
import { CreateProductService } from '../../service/PR/Products/CreateProductService';
import { Stamps } from '@prisma/client';
import { HistoryRepositorie } from '../../repositories/PR/historyRepositorie';
import { CreateHistoryService } from '../../service/PR/History/CreateHistoryService';

const createHistory = new CreateHistoryService(new HistoryRepositorie())

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
const qrcodeProduct = new QRCodeService(new ProductRepositorie());

interface ProductRequestProps extends Request {
  body: {
    id: string;
    sku: string;
    version: string;
    productName: string;
    productLine: string;
    productImage: string;
    composition: string;
    compositionINCI: string;
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
    idUser: string;
    iduser: string;
    idproduct: string;
  }
  params: {
    idProduct: string; 
  }
  headers: {
  }
}

export default {
  async createProduct(req: ProductRequestProps, res: Response) {
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
        idUser,
      } = req.body;

      const newProduct = await createProduct.execute(
        idUser,
        sku,
        version,
        productName,
        productLine,
        productImage,
        composition,
        compositionINCI,
        Stamps
      );

      const product = await findProduct.execute(newProduct.id);

      const history = await createHistory.execute(
        'Criação de novo Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        idUser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Cadastrado!',
        data: {
          product: product,
          history: history
        }
      });

    } catch (err) {
      console.log(err)
      return res.status(512).json({message: err.message});
    }
  },

  async copyProduct(req: ProductRequestProps, res: Response) {
    try {
      const { iduser } = req.body;
      const { 
        idProduct, 
        newVersion, 
        composition, 
        compositionINCI,
        copyInstruction 
      } = req.body;

      const newProduct = await copyProduct.execute(
        iduser, 
        idProduct, 
        newVersion, 
        composition, 
        compositionINCI,
        copyInstruction
      );

      const product = await findProduct.execute(newProduct.id);

      const history = await createHistory.execute(
        'Cópia de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Cadastrado!',
        data: {
          product: product,
          history: history
        }
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async registred(_req: ProductRequestProps, res: Response) {
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

  async validation(_req: ProductRequestProps, res: Response) {
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

  async history(_req: ProductRequestProps, res: Response) {
    try {
      const products = await findProductsHistory.execute();

      console.log(products)

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

  async findProduct(req: ProductRequestProps, res: Response) {
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

  async accept(req: ProductRequestProps, res: Response) {
    try {
      const { idproduct, iduser } = req.body; 

      const product = await acceptProduct.execute(idproduct, iduser);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      const history = await createHistory.execute(
        'Aprovação de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Aprovado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async reject(req: ProductRequestProps, res: Response) {
    try {
      const { idproduct, iduser } = req.body; 

      const product = await rejectProduct.execute(idproduct, iduser);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      const history = await createHistory.execute(
        'Rejeição de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Rejeitado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async disable(req: ProductRequestProps, res: Response) {
    try {
      const { reason, idproduct, iduser } = req.body; 

      const product = await disableProduct.execute(idproduct, iduser, reason);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      const history = await createHistory.execute(
        'Desabilitação de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Desabilitado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async restore(req: ProductRequestProps, res: Response) {
    try {
      const { idproduct, iduser } = req.body; 

      const product = await restoreProduct.execute(idproduct);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      const history = await createHistory.execute(
        'Restauração de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Restaurado!',
        data: {
          product: product,
          history: history
        }
      });
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alter(req: ProductRequestProps, res: Response) {
    try {
      const { Stamps, productImage, idproduct, iduser } = req.body;

      const product = await alterProduct.execute(idproduct, productImage, Stamps);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      const history = await createHistory.execute(
        'Alteração de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: Produto Alterado!',
        data: {
          product: product,
          history: history
        }
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async qrcode(req: ProductRequestProps, res: Response) {
    try{
      const { idproduct, iduser } = req.body;

      const product = await qrcodeProduct.execute(idproduct);

      if (!product) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Produto Não Encontrado!',
        });
      }

      const history = await createHistory.execute(
        'Visualização de QRCode de Produto',
        true,
        `${product.productLine} - ${product.productName} - ${product.version} - ${product.sku}`,
        iduser
      )

      return res.status(201).json({
        error: false,
        message: 'Sucesso: QRCode Gerado!',
        data: {
          product: product,
          history: history
        }
      });

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  }

};
