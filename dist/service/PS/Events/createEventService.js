"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEventService = void 0;
class CreateEventService {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute(name, password, activeData, active) {
    const event = await this.eventsRepository.create(name, password, activeData, active);
    return event;
  }
}
exports.CreateEventService = CreateEventService;