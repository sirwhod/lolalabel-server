import { ClientEvents } from "@prisma/client";

export interface IClientsRepository {
  create(
    name: string, 
    email: string, 
    event: string, 
    news: boolean, 
    phone: string
  ): Promise<ClientEvents>;
  findMany(nameevent: string): Promise<ClientEvents[]>;
  
}