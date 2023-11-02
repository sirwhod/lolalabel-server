import { Users } from '@prisma/client';

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

export interface IUserRepository {
  create( 
    username: string,
    name: string,
    imgProfile: string,
    departament: string,
    permission: string, 
    password: string
    ): Promise<Users>;
  auth(username: string, password: string): Promise<AuthResponse>;
  find(username: string): Promise<ResponseUser>;
  findUserId(id: string): Promise<ResponseUser>;
  alter(
    id: string,
    departament: 'Tecnologia da Informação' | 'Marketing de Produto' | 'Garantia da Qualidade',
    permission: 'Administrador' | 'Validador' | 'Registrador',
    active: boolean 
    ): Promise<ResponseUser>
  alterPassword(
    id: string,
    password: string
    ): Promise<ResponseUser>
  findMany(): Promise<ResponseUser[]>
}