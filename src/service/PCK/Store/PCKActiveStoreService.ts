import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKActiveStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(STid: string){
    const Store = await this.StoreRepository.active(STid);

    return Store;
  }
}

export {
  PCKActiveStoreService
};