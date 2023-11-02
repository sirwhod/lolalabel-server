import { IInstructionRepository } from '../../../interfaces/PR/IInstructionRepository';


class RegistredInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(){
    const instruction = await this.instructionRepository.registred();

    return instruction;
  }
}

export {
  RegistredInstructionService
};