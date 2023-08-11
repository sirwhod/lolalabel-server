import { IUserRepository } from '../../interfaces/IUserRepository';


class AlterUserService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(
    id: string,
    departament: 'Tecnologia da Informação' | 'Marketing de Produto' | 'Garantia da Qualidade',
    permission: 'Administrador' | 'Validador' | 'Registrador',
    active: boolean 
  ){
    const user = await this.UserRepository.alter(id, departament, permission, active);

    return user;
  }
}

export {
  AlterUserService
};