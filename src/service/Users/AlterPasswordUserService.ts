import { IUserRepository } from '../../interfaces/IUserRepository';

class AlterPasswordUserService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(
    id: string,
    password: string,
  ){
    const user = await this.UserRepository.alterPassword(id, password);

    return user;
  }
}

export {
  AlterPasswordUserService
};