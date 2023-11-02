import { IInstructionRepository } from '../../../interfaces/PR/IInstructionRepository';


class ValidationInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(){
    const instruction = await this.instructionRepository.validation();

    return instruction;
  }
}

export {
  ValidationInstructionService
};