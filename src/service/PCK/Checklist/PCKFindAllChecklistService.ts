import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKFindAllChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(){
    const Checklist = await this.ChecklistRepository.findAll();

    return Checklist;
  }
}

export {
  PCKFindAllChecklistService
};