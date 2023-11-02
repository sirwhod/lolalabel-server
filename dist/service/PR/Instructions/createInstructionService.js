"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateInstructionService = void 0;
class CreateInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute(language, whatIAm, modeOfUse, Precaution, idproduct, iduser) {
    const instruction = await this.instructionRepository.create(language, whatIAm, modeOfUse, Precaution, idproduct, iduser);
    return instruction;
  }
}
exports.CreateInstructionService = CreateInstructionService;