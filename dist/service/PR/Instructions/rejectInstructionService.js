"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RejectInstructionService = void 0;
class RejectInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute(idinstruction, iduser) {
    const instruction = await this.instructionRepository.reject(idinstruction, iduser);
    return instruction;
  }
}
exports.RejectInstructionService = RejectInstructionService;