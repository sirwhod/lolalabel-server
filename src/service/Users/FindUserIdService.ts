import { IUserRepository } from '../../interfaces/IUserRepository';


class FindUserIdService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(
    id: string, 
  ){
    const user = await this.UserRepository.findUserId(id);

    return user;
  }
}

export {
  FindUserIdService
};