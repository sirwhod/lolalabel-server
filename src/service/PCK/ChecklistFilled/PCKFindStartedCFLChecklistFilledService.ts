import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindStartedCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(){
    const ChecklistFilled = await this.ChecklistFilledRepository.findStartedCFL();

    return ChecklistFilled;
  }
}

export {
  PCKFindStartedCFLChecklistFilledService
};