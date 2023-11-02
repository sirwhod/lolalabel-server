import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../repositories/PR/userRepositorie';
import { tokenDecoder } from '../../utils/PR/tokenAuth';
import { FindUserIdService } from '../../service/PR/Users/FindUserIdService';

interface AuthRequestProps extends Request {
  headers: {
    authorization: string;
  }
}

const findUserId = new FindUserIdService(new UserRepository());

const userMiddleware = async (req: AuthRequestProps, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;  
  try {
    const id = tokenDecoder(authorization);

    console.log(id)

    const userExists = await findUserId.execute(id);

    if (!userExists) {
      return res.status(404).json({
        error: true,
        message: 'Erro: Usuário não existe!',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      error: true,
      message: 'Erro: Token não é valido!',
    });  
  }
};

export default userMiddleware;