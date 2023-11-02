import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKActiveChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(
    CLid: string
  ){
    const Checklist = await this.ChecklistRepository.active(
      CLid
    );

    return Checklist;
  }
}

export {
  PCKActiveChecklistService
};