import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKFindActivatedChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(){
    const Checklist = await this.ChecklistRepository.findActivated();

    return Checklist;
  }
}

export {
  PCKFindActivatedChecklistService
};