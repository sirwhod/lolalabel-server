import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKModifyNameTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKid: string, 
    TKname: string
  ){
    const Task = await this.TaskRepository.modifyName(
      TKid,
      TKname
    );

    return Task;
  }
}

export {
  PCKModifyNameTaskService
};