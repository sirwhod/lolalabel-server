"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateClientService = void 0;
class CreateClientService {
  constructor(clientsRepository) {
    this.clientsRepository = clientsRepository;
  }
  async execute(name, email, event, news, phone) {
    const client = await this.clientsRepository.create(name, email, event, news, phone);
    return client;
  }
}
exports.CreateClientService = CreateClientService;