import { LoginEvents } from "@prisma/client";

export interface ResponseFind {
  id: string;
  name: string;
  activeData: Date;
  active: boolean;
  drawn: boolean;
  drawnClient: string;
}

export interface IEventsRepository {
  create(
    name: string,
    password: string,
    activeData: Date,
    active: boolean,
  ): Promise<LoginEvents>;
  findMany(): Promise<ResponseFind[]>;
  find(nameevent: string): Promise<ResponseFind>;
  drawprize(
    id: string, 
    name: string, 
    phone: string, 
    email: string
  ): Promise<ResponseFind>;
  action(idEvent: string): Promise<ResponseFind>;
}