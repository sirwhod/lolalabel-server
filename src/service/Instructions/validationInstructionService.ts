import { IInstructionRepository } from '../../interfaces/IInstructionRepository';

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