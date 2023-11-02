"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DisableInstructionService = void 0;
class DisableInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute(idinstruction, iduser, reason) {
    const instruction = await this.instructionRepository.disable(idinstruction, iduser, reason);
    return instruction;
  }
}
exports.DisableInstructionService = DisableInstructionService;