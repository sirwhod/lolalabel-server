import {Request, Response} from 'express';
import { CreateEventService } from '../../service/PS/Events/createEventService';
import { EventsRepository } from '../../repositories/PS/eventsRepositorie';
import { FindEventService } from '../../service/PS/Events/findEventService';
import { FindManyEventService } from '../../service/PS/Events/findManyEventService';
import { DrawPrizeEventService } from '../../service/PS/Events/drawPrizeEventService';
import { ActionEventService } from '../../service/PS/Events/actionEventService';

const createEvent = new CreateEventService(new EventsRepository());
const findEvent = new FindEventService(new EventsRepository());
const findManyEvent = new FindManyEventService(new EventsRepository());
const drawPrizeEvent = new DrawPrizeEventService(new EventsRepository());
const actionEvent = new ActionEventService(new EventsRepository());

interface EventsRequestProps extends Request {
  body: {
    id: string,
    name: string, 
    password: string, 
    activeData: Date, 
    active: boolean,
    phone: string, 
    email: string
  },
  params: {
    nameevent: string,
    idEvent: string,
  }
}

export default {
  async createEvent(req: EventsRequestProps, res: Response) {
    try {
      const { name, password, activeData, active } = req.body

      const newEvent = await createEvent.execute(
        name, 
        password, 
        activeData, 
        active
      )

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
      return res.status(512).json({message: err.message});
    }
  },

  async findEvent(req: EventsRequestProps, res: Response) {
    try {
      const { nameevent } = req.params

      const event = await findEvent.execute(
        nameevent
      )

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
      return res.status(512).json({message: err.message});
    }
  },

  async findManyEvents(req: EventsRequestProps, res: Response) {
    try {
      const events = await findManyEvent.execute()

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
      return res.status(512).json({message: err.message});
    }
  },

  async drawprizeEvents(req: EventsRequestProps, res: Response) {
    try {
      const { id, name, phone, email} = req.body

      const event = await drawPrizeEvent.execute(
        id, 
        name, 
        phone, 
        email
      )

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
      return res.status(512).json({message: err.message});
    }
  },

  async actionEvents(req: EventsRequestProps, res: Response) {
    try {
      const { idEvent } = req.params

      const event = await actionEvent.execute(idEvent)

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
      return res.status(512).json({message: err.message});
    }
  }
}