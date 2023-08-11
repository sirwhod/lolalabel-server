import { NextFunction, Request, Response } from 'express';
import { FindProductService } from '../service/Products/FindProductService';
import { ProductRepositorie } from '../repositories/productRepositorie';

interface AuthRequestProps extends Request {
  headers: {
    idproduct: string
  }
}

const findProduct = new FindProductService(new ProductRepositorie());


const productExistsMiddleware = async (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const { idproduct } = req.headers;  
  try {
    const product = await findProduct.execute(idproduct);

    if(!product) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Produto não existe!',
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