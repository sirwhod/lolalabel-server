import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKCreateCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    CFLidChecklist: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.createCFL(
      CFLidChecklist
    );

    return ChecklistFilled;
  }
}

export {
  PCKCreateCFLChecklistFilledService
};