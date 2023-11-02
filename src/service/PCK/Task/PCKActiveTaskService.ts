import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKActiveTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKid: string
  ){
    const Task = await this.TaskRepository.active(
      TKid
    );

    return Task;
  }
}

export {
  PCKActiveTaskService
};