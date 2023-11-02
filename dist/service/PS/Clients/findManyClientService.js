"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindManyClientService = void 0;
class FindManyClientService {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute(nameevent) {
    const client = await this.clientsRepository.findMany(nameevent);
    return client;
  }
}
exports.FindManyClientService = FindManyClientService;