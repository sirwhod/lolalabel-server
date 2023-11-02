import { IPCKStoreRepository } from "../../../interfaces/PCK/IStoreRepository";


class PCKCreateStoreService {
  constructor(
    private StoreRepository: IPCKStoreRepository
  ){ }

  public async execute(
    STname: string
  ){
    const Store = await this.StoreRepository.create(
      STname
    );

    return Store;
  }
}

export {
  PCKCreateStoreService
};