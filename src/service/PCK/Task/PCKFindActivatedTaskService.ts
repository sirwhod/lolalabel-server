import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKFindActivatedTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(){
    const Task = await this.TaskRepository.findActivated();

    return Task;
  }
}

export {
  PCKFindActivatedTaskService
};