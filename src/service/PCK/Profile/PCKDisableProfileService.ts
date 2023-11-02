import { IPCKProfileRepository } from "../../../interfaces/PCK/IProfileRepository";


class PCKDisableProfileService {
  constructor(
    private ProfileRepository: IPCKProfileRepository
  ){ }

  public async execute(PRid: string){
    const Profile = await this.ProfileRepository.disable(PRid);

    return Profile;
  }
}

export {
  PCKDisableProfileService
};