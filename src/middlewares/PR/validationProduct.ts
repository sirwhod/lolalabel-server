import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../database';

interface validateProductRequest extends Request {
  body: {
    idproduct: string
  }
}

const validateProductMiddleware = async (req: validateProductRequest, res: Response, next: NextFunction) => {
  try {
    const { idproduct } = req.body;  
    
    const validationProduct = await prisma.products.findUnique({
      where: {
        id: idproduct
      }
    })

    const products = await prisma.products.findMany()

    const equalProductVersionAndCode = products.find((product) => {
      return product.sku === validationProduct.sku && 
             product.version === validationProduct.version && 
             product.isActive === true && 
             product.isValidated
    })

    if(equalProductVersionAndCode) {
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

export default validateProductMiddleware;