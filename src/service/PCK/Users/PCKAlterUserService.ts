import { IPCKUserRepository } from "../../../interfaces/PCK/IUserRepository";


class PCKAlterUserService {
  constructor(
    private UserRepository: IPCKUserRepository
  ){ }

  public async execute(
    USid: string,
    USidProfile: string,
    USidStore: string,
    USstatus: boolean
  ){
    const user = await this.UserRepository.alter(
      USid,
      USidProfile,
      USidStore,
      USstatus
    )

    return user;
  }
}

export {
  PCKAlterUserService
};