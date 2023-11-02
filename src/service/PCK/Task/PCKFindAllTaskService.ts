import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKFindAllTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(){
    const Task = await this.TaskRepository.findAll();

    return Task;
  }
}

export {
  PCKFindAllTaskService
};