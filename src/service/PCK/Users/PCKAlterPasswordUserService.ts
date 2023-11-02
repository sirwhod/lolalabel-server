import { IPCKUserRepository } from "../../../interfaces/PCK/IUserRepository";


class PCKAlterPasswordUserService {
  constructor(
    private UserRepository: IPCKUserRepository
  ){ }

  public async execute(
    USid: string,
    USpassword: string
  ){
    const user = await this.UserRepository.alterPassword(
      USid,
      USpassword
    )

    return user;
  }
}

export {
  PCKAlterPasswordUserService
};