import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKFindByIdChecklistTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKidChecklist: string
  ){
    const Task = await this.TaskRepository.findByIdChecklist(
      TKidChecklist
    );

    return Task;
  }
}

export {
  PCKFindByIdChecklistTaskService
};