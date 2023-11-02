import { IUserRepository } from '../../../interfaces/PR/IUserRepository';

class FindManyUserService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(){
    const users = await this.UserRepository.findMany();

    return users;
  }
}

export {
  FindManyUserService
};