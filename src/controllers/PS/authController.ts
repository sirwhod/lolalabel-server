import {Request, Response} from 'express';
import { AuthRepository } from '../../repositories/PS/authRepositorie';
import { AuthService } from '../../service/PS/Auth/authService';

const authService = new AuthService(new AuthRepository());

interface AuthRequestProps extends Request {
  body: {
    password: string,
    username: string
  }
}

export default {
  async auth(req: AuthRequestProps, res: Response) {
    try {
      const { password, username } = req.body

      const auth = await authService.execute(
        password, 
        username
      )

      if (!auth) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário ou senha estão incorretos!',
          data: null
        });
      }

      if (auth) {
        res.header('Access-Control-Allow-Origin', 'http://sorteio.lolacosmetics.com.br')
  res.header('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization')
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário Autenticado!',
          data: auth
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  }
}