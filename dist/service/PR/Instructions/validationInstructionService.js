"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationInstructionService = void 0;
class ValidationInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute() {
    const instruction = await this.instructionRepository.validation();
    return instruction;
  }
}
exports.ValidationInstructionService = ValidationInstructionService;