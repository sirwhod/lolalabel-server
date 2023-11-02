import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFinishCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    CSidChecklistFilled: string,
    CSidUserFinished: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.finishCFL(
      CSidChecklistFilled,
      CSidUserFinished
    );

    return ChecklistFilled;
  }
}

export {
  PCKFinishCFLChecklistFilledService
};