"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientsRepository = void 0;
var _database = require("../../database");
class ClientsRepository {
  async create(name, email, event, news, phone) {
    const searchClient = await _database.prisma.clientEvents.findFirst({
      where: {
        email
      }
    });
    if (searchClient) {
      const alterClient = await _database.prisma.clientEvents.update({
        where: {
          id: searchClient.id
        },
        data: {
          name,
          email,
          event,
          news,
          phone
        }
      });
      return alterClient;
    } else {
      const NewClient = await _database.prisma.clientEvents.create({
        data: {
          name,
          email,
          event,
          news,
          phone
        }
      });
      return NewClient;
    }
  }
  async findMany(nameevent) {
    if (nameevent === 'admin') {
      const eventList = await _database.prisma.clientEvents.findMany();
      return eventList;
    } else {
      const eventsList = await _database.prisma.clientEvents.findMany({
        where: {
          event: nameevent
        }
      });
      return eventsList;
    }
  }
}
exports.ClientsRepository = ClientsRepository;