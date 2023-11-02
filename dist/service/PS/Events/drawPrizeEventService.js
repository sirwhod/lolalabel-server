"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawPrizeEventService = void 0;
class DrawPrizeEventService {
  constructor(eventsRepository) {
    this.eventsRepository = eventsRepository;
  }
  async execute(id, name, phone, email) {
    const event = await this.eventsRepository.drawprize(id, name, phone, email);
    return event;
  }
}
exports.DrawPrizeEventService = DrawPrizeEventService;