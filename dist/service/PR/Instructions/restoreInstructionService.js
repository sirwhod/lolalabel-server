"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreInstructionService = void 0;
class RestoreInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute(idinstruction) {
    const instruction = await this.instructionRepository.restore(idinstruction);
    return instruction;
  }
}
exports.RestoreInstructionService = RestoreInstructionService;