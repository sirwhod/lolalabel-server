import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKAlterNameStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(
    STid: string,
    STname: string
  ){
    const Store = await this.StoreRepository.alterName(STid, STname);

    return Store;
  }
}

export {
  PCKAlterNameStoreService
};