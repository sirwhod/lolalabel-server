import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindByIdCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    CFLid: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.findByIdCFL(
      CFLid
    );

    return ChecklistFilled;
  }
}

export {
  PCKFindByIdCFLChecklistFilledService
};