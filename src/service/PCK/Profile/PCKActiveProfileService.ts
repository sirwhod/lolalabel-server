import { IPCKProfileRepository } from "../../../interfaces/PCK/IProfileRepository";


class PCKActiveProfileService {
  constructor(
    private ProfileRepository: IPCKProfileRepository
  ){ }

  public async execute(PRid: string){
    const Profile = await this.ProfileRepository.active(PRid);

    return Profile;
  }
}

export {
  PCKActiveProfileService
};