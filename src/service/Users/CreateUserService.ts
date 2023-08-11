import { IUserRepository } from '../../interfaces/IUserRepository';


class CreateUserService {
  constructor(
    private UserRepository: IUserRepository
  ){ }

  public async execute(
    username: string, 
    name: string, 
    imgProfile: string, 
    departament: string, 
    permission: string, 
    password: string
  ){
    const user = await this.UserRepository.create(
      username, 
      name, 
      imgProfile, 
      departament, 
      permission, 
      password
    );

    return user;
  }
}

export {
  CreateUserService
};