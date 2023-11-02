"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AcceptInstructionService = void 0;
class AcceptInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute(idinstruction, iduser) {
    const instruction = await this.instructionRepository.accept(idinstruction, iduser);
    return instruction;
  }
}
exports.AcceptInstructionService = AcceptInstructionService;