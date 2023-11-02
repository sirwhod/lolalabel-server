"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindManyEventService = void 0;
class FindManyEventService {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute() {
    const event = await this.eventsRepository.findMany();
    return event;
  }
}
exports.FindManyEventService = FindManyEventService;