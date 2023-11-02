"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HistoryInstructionService = void 0;
class HistoryInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute() {
    const instruction = await this.instructionRepository.history();
    return instruction;
  }
}
exports.HistoryInstructionService = HistoryInstructionService;