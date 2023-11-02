import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKStartCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    CSidChecklistFilled: string,
    CSidUserStarted: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.startCFL(
      CSidChecklistFilled,
      CSidUserStarted
    );

    return ChecklistFilled;
  }
}

export {
  PCKStartCFLChecklistFilledService
};