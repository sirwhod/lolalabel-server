import { IPCKUserRepository } from "../../../interfaces/PCK/IUserRepository";


class PCKCreateUserService {
  constructor(
    private UserRepository: IPCKUserRepository
  ){ }

  public async execute(
    USname: string,
    USusername: string,
    USpassword: string,
    USregistration: string,
    USidProfile: string,
    USidStore: string
  ){
    const user = await this.UserRepository.create(
      USname,
      USusername,
      USpassword,
      USregistration,
      USidProfile,
      USidStore,
    );

    return user;
  }
}

export {
  PCKCreateUserService
};