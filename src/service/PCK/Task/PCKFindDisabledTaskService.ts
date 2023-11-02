import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKFindDisabledTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(){
    const Task = await this.TaskRepository.findDisabled();

    return Task;
  }
}

export {
  PCKFindDisabledTaskService
};