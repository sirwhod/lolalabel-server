import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKDisableChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(
    CLid: string
  ){
    const Checklist = await this.ChecklistRepository.disable(
      CLid
    );

    return Checklist;
  }
}

export {
  PCKDisableChecklistService
};