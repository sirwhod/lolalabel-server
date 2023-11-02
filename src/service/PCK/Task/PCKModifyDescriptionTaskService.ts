import { IPCKTaskRepository } from "../../../interfaces/PCK/ITaskRepository";

class PCKModifyDescriptionTaskService {
  constructor(
    private TaskRepository: IPCKTaskRepository
  ){ }

  public async execute(
    TKid: string, 
    TKdescription: string
  ){
    const Task = await this.TaskRepository.modifyDescription(
      TKid,
      TKdescription
    );

    return Task;
  }
}

export {
  PCKModifyDescriptionTaskService
};