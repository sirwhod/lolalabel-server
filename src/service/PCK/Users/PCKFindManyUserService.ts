import { IPCKUserRepository } from "../../../interfaces/PCK/IUserRepository";


class PCKFindManyUserService {
  constructor(
    private UserRepository: IPCKUserRepository
  ){ }

  public async execute(){
    const user = await this.UserRepository.findMany()

    return user;
  }
}

export {
  PCKFindManyUserService
};