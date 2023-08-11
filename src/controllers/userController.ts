import {Request, Response} from 'express';

import { UserRepository } from '../repositories/userRepositorie';
import { CreateUserService } from '../service/Users/CreateUserService';
import { FindUserService } from '../service/Users/FindUserService';
import { AlterUserService } from '../service/Users/AlterUserService';
import { FindManyUserService } from '../service/Users/FindManyUserService';
import { AlterPasswordUserService } from '../service/Users/AlterPasswordUserService';
import { AuthUserService } from '../service/Users/AuthUserService';

const createUser = new CreateUserService(new UserRepository());
const authUser = new AuthUserService(new UserRepository());
const findUser = new FindUserService(new UserRepository());
const findManyUser = new FindManyUserService(new UserRepository());
const alterUser = new AlterUserService(new UserRepository());
const alterPasswordUser = new AlterPasswordUserService(new UserRepository());

interface CreateUserProps extends Request {
  body: {
    id?: string;
    username: string;
    name: string;
    imgProfile: string;
    departament: 'Tecnologia da Informação' | 'Marketing de Produto' | 'Garantia da Qualidade';
    permission: 'Administrador' | 'Validador' | 'Registrador', 
    password: string;
    active?: boolean;
  }
  params: {
    id: string;
    username: string;
  },
  headers: {
    username: string;
    password: string;
  }
}

export default {
  async createUser(req: CreateUserProps, res: Response) {
    try {
      const { username, name, imgProfile, departament, permission, password } =  req.body;

      const userExists = await findUser.execute(username);

      if (userExists) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário já existe!'
        });
      }

      const user = await createUser.execute(username, name, imgProfile, departament, permission, password);

      if (user) {

        const userData = await findUser.execute(user.username);

        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário Cadastrado!',
          data: userData
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async auth(req: CreateUserProps, res: Response) {
    try {
      const { 
        username,
        password
      } = req.headers;
  
      const user = await authUser.execute(username, password);
  
      if (!user) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário ou senha incorretos!',
          data: null
        });
      }
  
      if (user) {
        return res.status(200).json({
          error: false,
          message: 'Sucesso: Usuário autenticado!',
          data: user
        });
      }
    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findUser(req: CreateUserProps, res: Response) {
    try {
      const { username } =  req.params;

      const user = await findUser.execute(username);

      if (user) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário encontrado!',
          data: user
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async findManyUsers(req: CreateUserProps, res: Response) {
    try {

      const users = await findManyUser.execute();

      if (users) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuários encontrados!',
          data: users
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterUser(req: CreateUserProps, res: Response) {
    try{
      const { id, departament, permission, active } =  req.body;

      const user = await alterUser.execute(id, departament, permission, active );

      if (user) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Usuário alterado!',
          data: user
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  },

  async alterPasswordUser(req: CreateUserProps, res: Response) {
    try{
      const { id, password } =  req.body;

      const user = await alterPasswordUser.execute(id, password);

      if (user) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Senha de usuário alterada!',
          data: user
        });
      }

    } catch (err) {
      return res.status(512).json({message: err.message});
    }
  }
};
