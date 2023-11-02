import { IPCKUserRepository } from "../../../interfaces/PCK/IUserRepository";


class PCKAuthUserService {
  constructor(
    private UserRepository: IPCKUserRepository
  ){ }

  public async execute(
    USusername: string, 
    USpassword: string
  ){
    const user = await this.UserRepository.auth(
      USusername,
      USpassword
    )

    return user;
  }
}

export {
  PCKAuthUserService
};