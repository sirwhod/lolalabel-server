"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegistredInstructionService = void 0;
class RegistredInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute() {
    const instruction = await this.instructionRepository.registred();
    return instruction;
  }
}
exports.RegistredInstructionService = RegistredInstructionService;