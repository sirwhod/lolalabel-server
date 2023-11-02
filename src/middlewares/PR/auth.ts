import { NextFunction, Request, Response } from 'express';
import { tokenDecoder } from '../../utils/PR/tokenAuth';

interface AuthRequestProps extends Request {
  headers: {
    authorization: string;
  }
}

const authMiddleware = async (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json({
      error: true,
      message: 'Erro: Token não existe!',
    });
  } 
  
  try {
    const id = tokenDecoder(authorization);

    if (id) {
      next();
    } else {
      return res.status(404).json({
        error: true,
        message: 'Erro: Token não é valido!',
      }); 
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Token não é valido!',
    });  
  }
};

export default authMiddleware;