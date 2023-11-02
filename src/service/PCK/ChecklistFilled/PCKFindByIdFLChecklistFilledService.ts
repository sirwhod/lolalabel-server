import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindByIdFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    FLid: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.findByIdFL(
      FLid
    );

    return ChecklistFilled;
  }
}

export {
  PCKFindByIdFLChecklistFilledService
};