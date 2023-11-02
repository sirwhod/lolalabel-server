import { Users } from '@prisma/client';


import { hash, compare } from 'bcryptjs';

import { prisma } from '../../database';
import { tokenGenerator } from '../../utils/PR/tokenAuth';
import { IUserRepository } from '../../interfaces/PR/IUserRepository';


interface AuthResponse {
  user: { 
    id: string, 
    name: string, 
    imgProfile: string, 
    departament: string, 
    permission: string 
  }, 
  token: string
}

type ResponseUser = {
  id: string,
  name: string,
  username: string,
  departament: string,
  imgProfile: string,
  permission: string,
  active: boolean,
}

class UserRepository implements IUserRepository {

  public async create(
    username: string, 
    name: string, 
    imgProfile: string, 
    departament: string, 
    permission: string, 
    password: string)
    : Promise<Users> {
    const hash_password = await hash(password, 8);

    const user = await prisma.users.create({
      data: {
        username,
        name, 
        imgProfile, 
        departament, 
        permission, 
        password: hash_password
      }
    });

    return user;
  }

  public async auth(username: string, password: string): Promise<AuthResponse>{
    const user = await prisma.users.findFirst({
      where: {
        username,
        active: true
      }
    });
  
    const isValuePassword= await compare(password, user.password);

    if (isValuePassword) {
      const token = tokenGenerator(user.id);
    
      return { 
        user: { 
          id: user.id, 
          name: user.name, 
          imgProfile: user.imgProfile, 
          departament: user.departament, 
          permission: user.permission 
        }, 
        token 
      };
    }
  }

  public async find(
    username: string)
    : Promise<ResponseUser> {

    const user = await prisma.users.findUnique({
      where: {
        username: username
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true,
      }
    });

    return user;
  }

  public async findUserId(
    id: string)
    : Promise<ResponseUser> {

    const user = await prisma.users.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true,
      }
    });

    return user;
  }

  public async findMany()
    : Promise<ResponseUser[]> {

    const users = await prisma.users.findMany({
      
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true,
      }
    });

    return users;
  }

  public async alter(
    id: string,
    departament: 'Tecnologia da Informação' | 'Marketing de Produto' | 'Garantia da Qualidade',
    permission: 'Administrador' | 'Validador' | 'Registrador',
    active: boolean
  )
    : Promise<ResponseUser> {

      

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        departament,
        permission,
        active
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true,
      }
    });

    return user;
  }

  public async alterPassword(
    id: string,
    password: string
  )
    : Promise<ResponseUser> {

    const hash_password = await hash(password, 8);

    const user = await prisma.users.update({
      where: {
        id,
      },
      data: {
        password: hash_password,
      },
      select: {
        id: true,
        name: true,
        username: true,
        departament: true,
        imgProfile: true,
        permission: true,
        active: true,
      }
    });

    return user;
  }
}

export {
  UserRepository
};