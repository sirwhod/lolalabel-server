import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindAllCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(){
    const ChecklistFilled = await this.ChecklistFilledRepository.findAllCFL();

    return ChecklistFilled;
  }
}

export {
  PCKFindAllCFLChecklistFilledService
};