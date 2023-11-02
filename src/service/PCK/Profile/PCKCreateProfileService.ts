import { IPCKProfileRepository } from "../../../interfaces/PCK/IProfileRepository";


class PCKCreateProfileService {
  constructor(
    private ProfileRepository: IPCKProfileRepository
  ){ }

  public async execute(
    PRname: string
  ){
    const Profile = await this.ProfileRepository.create(
      PRname
    );

    return Profile;
  }
}

export {
  PCKCreateProfileService
};