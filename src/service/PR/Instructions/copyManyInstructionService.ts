import { IInstructionRepository } from '../../../interfaces/PR/IInstructionRepository';


class CopyManyInstructionService {
  constructor(
    private instructionRepository: IInstructionRepository
  ){ }

  public async execute(
    idproduct: string,
    newIdproduct: string
  ){
    const instruction = await this.instructionRepository.copyMany(idproduct, newIdproduct);

    return instruction;
  }
}

export {
  CopyManyInstructionService
};