import { IPCKProfileRepository } from "../../../interfaces/PCK/IProfileRepository";


class PCKAlterNameProfileService {
  constructor(
    private ProfileRepository: IPCKProfileRepository
  ){ }

  public async execute(
    PRid: string,
    PRname: string
  ){
    const Profile = await this.ProfileRepository.alterName(PRid, PRname);

    return Profile;
  }
}

export {
  PCKAlterNameProfileService
};