"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionEventService = void 0;
class ActionEventService {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute(idEvent) {
    const event = await this.eventsRepository.action(idEvent);
    return event;
  }
}
exports.ActionEventService = ActionEventService;