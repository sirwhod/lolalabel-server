import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKModifyFLChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    FLid: string, 
    FLresponse: string, 
    FLcomment: string, 
    FLidUser: string 
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.modifyFL(
      FLid,
      FLresponse,
      FLcomment,
      FLidUser
    );

    return ChecklistFilled;
  }
}

export {
  PCKModifyFLChecklistFilledService
};