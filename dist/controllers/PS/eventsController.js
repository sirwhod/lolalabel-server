"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createEventService = require("../../service/PS/Events/createEventService");
var _eventsRepositorie = require("../../repositories/PS/eventsRepositorie");
var _findEventService = require("../../service/PS/Events/findEventService");
var _findManyEventService = require("../../service/PS/Events/findManyEventService");
var _drawPrizeEventService = require("../../service/PS/Events/drawPrizeEventService");
var _actionEventService = require("../../service/PS/Events/actionEventService");
const createEvent = new _createEventService.CreateEventService(new _eventsRepositorie.EventsRepository());
const findEvent = new _findEventService.FindEventService(new _eventsRepositorie.EventsRepository());
const findManyEvent = new _findManyEventService.FindManyEventService(new _eventsRepositorie.EventsRepository());
const drawPrizeEvent = new _drawPrizeEventService.DrawPrizeEventService(new _eventsRepositorie.EventsRepository());
const actionEvent = new _actionEventService.ActionEventService(new _eventsRepositorie.EventsRepository());
var _default = {
  async createEvent(req, res) {
    try {
      const {
        name,
        password,
        activeData,
        active
      } = req.body;
      const newEvent = await createEvent.execute(name, password, activeData, active);
      if (!newEvent) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Evento não cadastrado!',
          data: null
        });
      }
      if (newEvent) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Evento cadastrado!',
          data: newEvent
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async findEvent(req, res) {
    try {
      const {
        nameevent
      } = req.params;
      const event = await findEvent.execute(nameevent);
      if (!event) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Evento não encontrado!',
          data: null
        });
      }
      if (event) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Evento encontrado!',
          data: event
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async findManyEvents(req, res) {
    try {
      const events = await findManyEvent.execute();
      if (!events) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Eventos não encontrados!',
          data: null
        });
      }
      if (events) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Eventos encontrados!',
          data: events
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async drawprizeEvents(req, res) {
    try {
      const {
        id,
        name,
        phone,
        email
      } = req.body;
      const event = await drawPrizeEvent.execute(id, name, phone, email);
      if (!event) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Evento não encontrado!',
          data: null
        });
      }
      if (event) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Evento Sorteado!',
          data: event
        });
      }
    } catch (err) {
      return res.status(512).json({
        message: err.message
      });
    }
  },
  async actionEvents(req, res) {
    try {
      const {
        idEvent
      } = req.params;
      const event = await actionEvent.execute(idEvent);
      if (!event) {
        return res.status(400).json({
          error: true,
          message: 'Erro: Evento não encontrado!',
          data: null
        });
      }
      if (event.active === true) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Evento ativado!',
          data: event
        });
      }
      if (event.active === false) {
        return res.status(201).json({
          error: false,
          message: 'Sucesso: Evento desativado!',
          data: event
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