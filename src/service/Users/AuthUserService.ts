import { IUserRepository } from '../../interfaces/IUserRepository';

class AuthUserService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(
    username: string, 
    password: string
  ){
    const user = await this.UserRepository.auth(
      username, password
    );

    return user;
  }
}

export {
  AuthUserService
};