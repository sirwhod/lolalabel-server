import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKCreateTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKidChecklist: string, 
    TKname: string, 
    TKdescription: string 
  ){
    const Task = await this.TaskRepository.create(
      TKidChecklist,
      TKname,
      TKdescription
    );

    return Task;
  }
}

export {
  PCKCreateTaskService
};