import { IInstructionRepository } from '../../../interfaces/PR/IInstructionRepository';


class RejectInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(
    idinstruction: string, 
    iduser: string
  ){
    const instruction = await this.instructionRepository.reject(
      idinstruction, 
      iduser
    );

    return instruction;
  }
}

export {
  RejectInstructionService
};