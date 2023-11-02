import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKFindManyStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(){
    const Stores = await this.StoreRepository.findMany();

    return Stores;
  }
}

export {
  PCKFindManyStoreService
};