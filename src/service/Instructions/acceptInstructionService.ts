import { IInstructionRepository } from '../../interfaces/IInstructionRepository';

class AcceptInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(
    idinstruction: string, 
    iduser: string
  ){
    const instruction = await this.instructionRepository.accept(
      idinstruction, 
      iduser
    );

    return instruction;
  }
}

export {
  AcceptInstructionService
};