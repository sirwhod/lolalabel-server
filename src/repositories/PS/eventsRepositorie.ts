import { LoginEvents } from '@prisma/client';
import { prisma } from '../../database';

import { IEventsRepository, ResponseFind } from '../../interfaces/PS/IEventsRepository';

class EventsRepository implements IEventsRepository {

  public async create(
    name: string,
    password: string,
    activeData: Date,
    active: boolean,
  ): Promise<LoginEvents> {
    console.log(activeData)

    const newEvent = await prisma.loginEvents.create({
      data: { 
        name,
        password,
        activeData,
        active,
        drawnClient: ''      
      }
    })
    return newEvent
  }

  public async findMany(): Promise<ResponseFind[]> {
    const eventsList = await prisma.loginEvents.findMany({
      select: {
        id: true,
        active: true,
        activeData: true,
        drawn: true,
        name: true,
        drawnClient: true
      }
    })
  
    return eventsList
  }

  public async find(nameevent: string): Promise<ResponseFind> {
    const event = await prisma.loginEvents.findFirst({
      where: {
        name: nameevent,
        active: true
      }
    })
  
    return event
  }

  public async drawprize(
    id: string, 
    name: string, 
    phone: string, 
    email: string
  ): Promise<ResponseFind> {
    const clientData = {
      name,
      phone,  
      email
    }
    
    const clientDataString = JSON.stringify(clientData)
  
  
    const alterEvent = await prisma.loginEvents.update({
      where: { 
        id
      },
      data: {
        drawn: true,
        drawnClient: clientDataString
      }
    })
  
    return alterEvent
  }

  public async action(idEvent: string): Promise<ResponseFind> {
    const event = await prisma.loginEvents.findFirst({
      where: {
        id: idEvent
      }
    }) 
  
    if (event?.active === true) {
      const eventAlter = await prisma.loginEvents.update({
        where: {
          id: event.id
        },
        data: {
          active: false
        }
      })
  
      return eventAlter
    } else {
      const eventAlter = await prisma.loginEvents.update({
        where: {
          id: event?.id
        },
        data: {
          active: true
        }
      })
  
      return eventAlter
    }
  }
}

export {
  EventsRepository
};