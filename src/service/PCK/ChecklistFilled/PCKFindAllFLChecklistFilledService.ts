import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindAllFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(){
    const ChecklistFilled = await this.ChecklistFilledRepository.findAllFL();

    return ChecklistFilled;
  }
}

export {
  PCKFindAllFLChecklistFilledService
};