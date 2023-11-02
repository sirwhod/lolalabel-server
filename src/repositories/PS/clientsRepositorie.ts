import { ClientEvents } from "@prisma/client";
import { IClientsRepository } from "../../interfaces/PS/IClientsRepository";
import { prisma } from "../../database";

class ClientsRepository implements IClientsRepository {

  public async create(
    name: string, 
    email: string, 
    event: string, 
    news: boolean, 
    phone: string
  ): Promise<ClientEvents> {
    const searchClient = await prisma.clientEvents.findFirst({
      where: {
        email,
      }
    })
  
    if (searchClient) {
      const alterClient = await prisma.clientEvents.update({
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
      })
  
      return alterClient
    } else {
      const NewClient = await prisma.clientEvents.create({
        data: {
          name, 
          email, 
          event, 
          news, 
          phone
        }
      })
  
      return NewClient
    }
  }

  public async findMany(nameevent: string): Promise<ClientEvents[]>{

    if (nameevent === 'admin') {
      const eventList = await prisma.clientEvents.findMany()
  
      return eventList
    } else {
      const eventsList = await prisma.clientEvents.findMany({
        where: {
          event: nameevent
        }
      })
  
      return eventsList
    }

  }

}

export {
  ClientsRepository
}