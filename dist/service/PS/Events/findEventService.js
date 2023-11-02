"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindEventService = void 0;
class FindEventService {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute(nameevent) {
    const event = await this.eventsRepository.find(nameevent);
    return event;
  }
}
exports.FindEventService = FindEventService;