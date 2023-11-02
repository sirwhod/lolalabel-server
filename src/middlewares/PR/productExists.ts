import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../database';

interface ProductExistsRequest extends Request {
  body: {
    idProduct: string
    newVersion: string
    composition: string
    compositionINCI: string
    copyInstruction: boolean
  }
}

const productExistsMiddleware = async (req: ProductExistsRequest, res: Response, next: NextFunction) => {
  try {
    const { idProduct, newVersion } = req.body;  
    
    const product = await prisma.products.findUnique({
      where: {
        id: idProduct
      }
    })

    if(product.version === newVersion) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Versão de produto já existe e está ativa!',
      }); 
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Produto não é valido!',
    });  
  }
};

export default productExistsMiddleware;