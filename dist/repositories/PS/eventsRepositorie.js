"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventsRepository = void 0;
var _database = require("../../database");
class EventsRepository {
  async create(name, password, activeData, active) {
    console.log(activeData);
    const newEvent = await _database.prisma.loginEvents.create({
      data: {
        name,
        password,
        activeData,
        active,
        drawnClient: ''
      }
    });
    return newEvent;
  }
  async findMany() {
    const eventsList = await _database.prisma.loginEvents.findMany({
      select: {
        id: true,
        active: true,
        activeData: true,
        drawn: true,
        name: true,
        drawnClient: true
      }
    });
    return eventsList;
  }
  async find(nameevent) {
    const event = await _database.prisma.loginEvents.findFirst({
      where: {
        name: nameevent,
        active: true
      }
    });
    return event;
  }
  async drawprize(id, name, phone, email) {
    const clientData = {
      name,
      phone,
      email
    };
    const clientDataString = JSON.stringify(clientData);
    const alterEvent = await _database.prisma.loginEvents.update({
      where: {
        id
      },
      data: {
        drawn: true,
        drawnClient: clientDataString
      }
    });
    return alterEvent;
  }
  async action(idEvent) {
    const event = await _database.prisma.loginEvents.findFirst({
      where: {
        id: idEvent
      }
    });
    if (event?.active === true) {
      const eventAlter = await _database.prisma.loginEvents.update({
        where: {
          id: event.id
        },
        data: {
          active: false
        }
      });
      return eventAlter;
    } else {
      const eventAlter = await _database.prisma.loginEvents.update({
        where: {
          id: event?.id
        },
        data: {
          active: true
        }
      });
      return eventAlter;
    }
  }
}
exports.EventsRepository = EventsRepository;