import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKFindDisabledChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(){
    const Checklist = await this.ChecklistRepository.findDisabled();

    return Checklist;
  }
}

export {
  PCKFindDisabledChecklistService
};