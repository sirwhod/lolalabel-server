import { IInstructionRepository } from '../../interfaces/IInstructionRepository';

class DisableInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(
    idinstruction: string, 
    iduser: string,
    reason: string
  ){
    const instruction = await this.instructionRepository.disable(
      idinstruction, 
      iduser,
      reason
    );

    return instruction;
  }
}

export {
  DisableInstructionService
};