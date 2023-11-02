import { IPCKUserRepository } from "../../../interfaces/PCK/IUserRepository";


class PCKFindUserService {
  constructor(
    private UserRepository: IPCKUserRepository
  ){ }

  public async execute(
    USusername: string
  ){
    const user = await this.UserRepository.find(
      USusername
    )

    return user;
  }
}

export {
  PCKFindUserService
};