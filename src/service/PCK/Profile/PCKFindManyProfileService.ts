import { IPCKProfileRepository } from "../../../interfaces/PCK/IProfileRepository";


class PCKFindManyProfileService {
  constructor(
    private ProfileRepository: IPCKProfileRepository
  ){ }

  public async execute(){
    const Profiles = await this.ProfileRepository.findMany();

    return Profiles;
  }
}

export {
  PCKFindManyProfileService
};