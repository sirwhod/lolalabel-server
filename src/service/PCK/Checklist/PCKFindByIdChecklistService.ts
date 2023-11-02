import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKFindByIdChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(
    CLid: string
  ){
    const Checklist = await this.ChecklistRepository.findById(
      CLid
    );

    return Checklist;
  }
}

export {
  PCKFindByIdChecklistService
};