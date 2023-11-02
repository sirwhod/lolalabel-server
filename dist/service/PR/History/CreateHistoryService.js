"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateHistoryService = void 0;
class CreateHistoryService {
  constructor(HistoryRepository) {
    this.HistoryRepository = HistoryRepository;
  }
  async execute(action, productOrInstruction, itemName, agent) {
    const user = await this.HistoryRepository.create(action, productOrInstruction, itemName, agent);
    return user;
  }
}
exports.CreateHistoryService = CreateHistoryService;