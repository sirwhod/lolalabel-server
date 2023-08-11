import { IInstructionRepository } from '../../interfaces/IInstructionRepository';

class CreateInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(
    language: string, 
    whatIAm: string, 
    modeOfUse: string, 
    Precaution: string, 
    idproduct: string, 
    iduser: string
  ){
    const instruction = await this.instructionRepository.create(
      language, 
      modeOfUse, 
      whatIAm, 
      Precaution, 
      idproduct, 
      iduser
    );

    return instruction;
  }
}

export {
  CreateInstructionService
};