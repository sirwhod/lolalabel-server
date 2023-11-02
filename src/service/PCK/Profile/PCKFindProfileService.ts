import { IPCKProfileRepository } from "../../../interfaces/PCK/IProfileRepository";


class PCKFindProfileService {
  constructor(
    private ProfileRepository: IPCKProfileRepository
  ){ }

  public async execute(
    PRid: string
  ){
    const Profile = await this.ProfileRepository.find(
      PRid
    );

    return Profile;
  }
}

export {
  PCKFindProfileService
};