import { IUserRepository } from '../../interfaces/IUserRepository';


class FindUserService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(
    username: string, 
  ){
    const user = await this.UserRepository.find(username);

    return user;
  }
}

export {
  FindUserService
};