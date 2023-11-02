import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKFindByIdTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKid: string
  ){
    const Task = await this.TaskRepository.findById(
      TKid
    );

    return Task;
  }
}

export {
  PCKFindByIdTaskService
};