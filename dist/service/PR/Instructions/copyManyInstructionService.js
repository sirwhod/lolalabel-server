"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyManyInstructionService = void 0;
class CopyManyInstructionService {
  constructor(instructionRepository) {
    this.instructionRepository = instructionRepository;
  }
  async execute(idproduct, newIdproduct) {
    const instruction = await this.instructionRepository.copyMany(idproduct, newIdproduct);
    return instruction;
  }
}
exports.CopyManyInstructionService = CopyManyInstructionService;