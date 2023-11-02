import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKFindStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(
    STname: string
  ){
    const Store = await this.StoreRepository.find(
      STname
    );

    return Store;
  }
}

export {
  PCKFindStoreService
};