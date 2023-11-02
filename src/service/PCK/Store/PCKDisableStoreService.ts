import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKDisableStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(STid: string){
    const Store = await this.StoreRepository.disable(STid);

    return Store;
  }
}

export {
  PCKDisableStoreService
};