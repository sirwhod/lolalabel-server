import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindFinishedCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(){
    const ChecklistFilled = await this.ChecklistFilledRepository.findFinishedCFL();

    return ChecklistFilled;
  }
}

export {
  PCKFindFinishedCFLChecklistFilledService
};