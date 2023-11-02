import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKFindByIdFLtoCFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    FLidChecklistFilled: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.findByIdFLtoCFL(
      FLidChecklistFilled
    );

    return ChecklistFilled;
  }
}

export {
  PCKFindByIdFLtoCFLChecklistFilledService
};