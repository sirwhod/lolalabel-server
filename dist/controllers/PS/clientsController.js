"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _clientsRepositorie = require("../../repositories/PS/clientsRepositorie");
var _createClientService = require("../../service/PS/Clients/createClientService");
var _findManyClientService = require("../../service/PS/Clients/findManyClientService");
const createClient = new _createClientService.CreateClientService(new _clientsRepositorie.ClientsRepository());
const findManyClient = new _findManyClientService.FindManyClientService(new _clientsRepositorie.ClientsRepository());
var _default = {
  async createClient(req, res) {
    try {
      const {
        name,
        email,
        event,
        news,
        phone
      } = req.body;
      const newClient = await createClient.execute(name, email, event, news, phone);
      if (!newClient) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Cliente não cadastrado!',
          data: null
        });
      }
      if (newClient) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Cliente cadastrado!',
          data: newClient
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async findManyClients(req, res) {
    try {
      const {
        nameevent
      } = req.params;
      const clients = await findManyClient.execute(nameevent);
      if (!clients) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Clientes não encontrados!',
          data: null
        });
      }
      if (clients) {
        return res.status(200).json({
          error: false,
          message: 'Sucesso: Clientes encontrados!',
          data: clients
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  }
};
exports.default = _default;