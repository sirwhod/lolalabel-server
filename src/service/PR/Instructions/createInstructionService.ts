import { IInstructionRepository } from '../../../interfaces/PR/IInstructionRepository';


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
      whatIAm, 
      modeOfUse, 
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