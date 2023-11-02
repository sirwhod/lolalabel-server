import { IHistoryRepository } from '../../../interfaces/PR/IHistoryRepository';

class CreateHistoryService {
  constructor(
    private HistoryRepository: IHistoryRepository
  ){ }

  public async execute(
    action: string,
    productOrInstruction: boolean,
    itemName: string,
    agent: string
  ){
    const user = await this.HistoryRepository.create(
      action,
      productOrInstruction,
      itemName,
      agent
    );

    return user;
  }
}

export {
  CreateHistoryService
};