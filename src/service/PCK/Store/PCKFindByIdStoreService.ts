import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKFindByIdStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(
    STid: string
  ){
    const Store = await this.StoreRepository.findById(
      STid
    );

    return Store;
  }
}

export {
  PCKFindByIdStoreService
};