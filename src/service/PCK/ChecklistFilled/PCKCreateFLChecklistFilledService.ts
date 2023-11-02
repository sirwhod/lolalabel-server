import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKCreateFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    FLidTask: string, 
    FLidUser: string, 
    FLidChecklistFilled: string
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.createFL(
      FLidTask,
      FLidUser,
      FLidChecklistFilled
    );

    return ChecklistFilled;
  }
}

export {
  PCKCreateFLChecklistFilledService
};