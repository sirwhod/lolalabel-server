import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKDisableTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKid: string
  ){
    const Task = await this.TaskRepository.disable(
      TKid
    );

    return Task;
  }
}

export {
  PCKDisableTaskService
};