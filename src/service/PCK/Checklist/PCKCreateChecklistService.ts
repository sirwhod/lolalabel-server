import { IPCKChecklistRepository } from "../../../interfaces/PCK/IChecklistRepository";

class PCKCreateChecklistService {
  constructor(
    private ChecklistRepository: IPCKChecklistRepository
  ){ }

  public async execute(
    CLname: string, 
    CLidStore: string
  ){
    const Checklist = await this.ChecklistRepository.create(
      CLname,
      CLidStore
    );

    return Checklist;
  }
}

export {
  PCKCreateChecklistService
};