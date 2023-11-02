import { IPCKChecklistFilledRepository } from "../../../interfaces/PCK/IChecklistFilledRepository";

class PCKCheckIdCFLTodayChecklistFilledService {
  constructor(
    private ChecklistFilledRepository: IPCKChecklistFilledRepository
  ){ }

  public async execute(
    CFLidChecklist: string, 
    CFLcreatedAt: Date
  ){
    const ChecklistFilled = await this.ChecklistFilledRepository.checkIdCFLToday(
      CFLidChecklist, 
      CFLcreatedAt
    );

    return ChecklistFilled;
  }
}

export {
  PCKCheckIdCFLTodayChecklistFilledService
};