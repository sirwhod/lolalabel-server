import {Request, Response} from 'express';
import { PCKUserRepository } from '../../repositories/PCK/userRepositorie';
import { PCKCreateUserService } from '../../service/PCK/Users/PCKCreateUserService';
import { PCKAuthUserService } from '../../service/PCK/Users/PCKAuthUserService';
import { PCKFindUserService } from '../../service/PCK/Users/PCKFindUserService';
import { PCKFindManyUserService } from '../../service/PCK/Users/PCKFindManyUserService';
import { PCKAlterUserService } from '../../service/PCK/Users/PCKAlterUserService';
import { PCKAlterPasswordUserService } from '../../service/PCK/Users/PCKAlterPasswordUserService';

const createUser = new PCKCreateUserService(new PCKUserRepository());
const authUser = new PCKAuthUserService(new PCKUserRepository());
const findUser = new PCKFindUserService(new PCKUserRepository());
const findManyUser = new PCKFindManyUserService(new PCKUserRepository());
const alterUser = new PCKAlterUserService(new PCKUserRepository());
const alterPasswordUser = new PCKAlterPasswordUserService(new PCKUserRepository());

interface UserRequestProps extends Request {
  body: {
    USid: string;
    USname: string,
    USusername: string,
    USpassword: string,
    USregistration: string,
    USidProfile: string,
    USidStore: string,
    USstatus: boolean
  }
  params: {
    USid: string;
    USusername: string;
  }
}

export default {
  async createUser(req: UserRequestProps, res: Response) {
    try {
      const { USusername, USname, USregistration, USpassword, USidStore, USidProfile } =  req.body;

      const userExists = await findUser.execute(USusername);

      console.log(userExists)

      if (userExists) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Usuário já existe!'
        });
      }

      const user = await createUser.execute(
        USname, 
        USusername, 
        USpassword, 
        USregistration, 
        USidProfile, 
        USidStore 
      ) 

      if (user) {
        const userData = await findUser.execute(user.USusername)

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

  async auth(req: UserRequestProps, res: Response) {
    try {
      const { 
        USusername,
        USpassword
      } = req.body;
  
      const user = await authUser.execute(USusername, USpassword);
  
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
      console.log(err)
      return res.status(512).json({message: err.message});
    }
  },

  async findUser(req: UserRequestProps, res: Response) {
    try {
      const { USusername } =  req.params;

      const user = await findUser.execute(USusername);

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

  async findManyUsers(req: UserRequestProps, res: Response) {
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

  async alterUser(req: UserRequestProps, res: Response) {
    try{
      const { USid, USidProfile, USidStore, USstatus } =  req.body;

      const user = await alterUser.execute(
        USid, USidProfile, USidStore, USstatus 
      );

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

  async alterPasswordUser(req: UserRequestProps, res: Response) {
    try{
      const { USid, USpassword } =  req.body;

      const user = await alterPasswordUser.execute(
        USid, 
        USpassword
      );

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
}