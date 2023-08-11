import { IInstructionRepository } from '../../interfaces/IInstructionRepository';

class RestoreInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(
    idinstruction: string
  ){
    const instruction = await this.instructionRepository.restore(
      idinstruction
    );

    return instruction;
  }
}

export {
  RestoreInstructionService
};