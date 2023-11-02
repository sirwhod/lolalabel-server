import { IInstructionRepository } from '../../../interfaces/PR/IInstructionRepository';


class HistoryInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(){
    const instruction = await this.instructionRepository.history();

    return instruction;
  }
}

export {
  HistoryInstructionService
};